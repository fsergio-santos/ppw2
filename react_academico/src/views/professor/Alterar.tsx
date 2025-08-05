import { useEffect, useState, type FormEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import Loading from '../../components/loading/Loading';

import Form from '../../components/form/Form';
import './usuario.css';

import Box from '../../components/box/Box';

import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import ImagemUpload from '../../components/image/ImagemUpload';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';
import Modal from '../../components/modal/ShowModal';
import SearchTable from '../../components/table/SearchTable';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosProfessor } from '../../rules/ProfessorValidationRules';
import useListCidades from '../../service/connection/cidade/ListCidades';
import useGetProfessor from '../../service/connection/professor/GetProfessor';
import useUpdateProfessor from '../../service/connection/professor/UpdateProfessor';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  MESSAGE_CANCEL_FORM,
  MESSAGE_SAVE_FORM,
  PROFESSOR_SHOW,
  SUCCESS,
  TIME,
  USUARIO_SHOW,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA, URL_DELETAR_FOTO, URL_SALVAR_FOTO } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import type { Cidade } from '../../type/Cidade';
import { camposObrigatoriosDoProfessor, mensagensCamposObrigatoriosDoProfessor } from '../../type/Professor';

const navegacaoProfessor = {
  titulo: PROFESSOR_SHOW,
  descricao: `Alterar dados do ${PROFESSOR_SHOW} no sistema`,
  iconTitulo: <FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: PROFESSOR_SHOW,
  toUrl: ROTA.PROFESSOR.LISTAR,
};

const Alterar = () => {
  const navigate = useNavigate();
  const [isCidadeModal, setIsCidadeModal] = useState<boolean>(false);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<Cidade | null>(null);
  const [listaCidade, setListaCidade] = useState<Cidade[] | null>(null);
  const { loading, showAlert } = useAlert();
  const {
    model,
    setModel,
    errors,
    setErrors,
    handleChangeField,
    handleBlurField,
    validarFormulario,
    setServerErrors,
    validarCamposVazios,
  } = useValidarDadosProfessor();
  const { id } = useParams();
  const { updateProfessor, errorUpdateProfessor } = useUpdateProfessor();
  const { findProfessorById, errorGetProfessor } = useGetProfessor();
  const { listCidades } = useListCidades();

  useEffect(() => {
    const getCidades = async () => {
      const data = await listCidades();
      if (data) {
        const { dados } = data;
        setListaCidade(dados);
      }
    };
    getCidades();
  }, [listCidades]);

  useEffect(() => {
    async function getProfessor() {
      if (id) {
        const data = await findProfessorById(id);
        if (data && data.dados) {
          const errosValidacao = validarCamposVazios(
            data.dados,
            camposObrigatoriosDoProfessor,
            mensagensCamposObrigatoriosDoProfessor,
          );
          if (errosValidacao) {
            setServerErrors(errosValidacao);
          }
          setModel(data.dados);
          const cidade = {
            idCidade: data.dados.idCidade,
            codCidade: '1' /* apenas para mater a compatibilidade de tipos. codCidadse não é processado aqui */,
            nomeCidade: data.dados.nomeCidade,
          };
          setCidadeSelecionada(cidade);
        }
      }
    }
    getProfessor();
  }, [id]);

  const onSubmitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarFormulario()) {
      showAlert(MENSAGEM_SISTEMA.CIDADE.DANGER, DANGER, TIME);
      return;
    }

    if (!id) return;

    const data = await updateProfessor(id, model);

    if (data && data.dados) {
      const errosValidacao = validarCamposVazios(
        data.dados,
        camposObrigatoriosDoProfessor,
        mensagensCamposObrigatoriosDoProfessor,
      );
      if (!errosValidacao || Object.keys(errosValidacao).length === 0) {
        navigate(ROTA.PROFESSOR.LISTAR);
      } else {
        setServerErrors(errosValidacao);
      }
      setModel(data.dados);
    } else {
      setErrors(errorUpdateProfessor);
      showAlert(MENSAGEM_SISTEMA.CIDADE.DANGER, DANGER, TIME);
    }
  };

  const onUploadSuccess = (nomeArquivo: string, ct: string) => {
    setModel((prev) => ({ ...prev, foto: nomeArquivo, contentType: ct }));
  };

  const onDeleteSuccess = (nomeArquivo: string, ct: string) => {
    setModel((prev) => ({ ...prev, foto: nomeArquivo, contentType: ct }));
  };

  const handleSelectCidade = (cidade: any) => {
    setCidadeSelecionada(cidade);

    if (cidadeSelecionada !== null) {
      setModel((prev) => {
        return {
          ...prev,
          idCidade: cidadeSelecionada.idCidade,
        };
      });
    }
  };

  return (
    <div>
      <Form navegacao={navegacaoProfessor}>
        {loading ? <Loading /> : null}
        <div className="container-usuario">
          <Box>
            <div className="janela">
              <div className="foto avatar-container ">
                <ImagemUpload
                  id={0}
                  urlSalvar={URL_SALVAR_FOTO}
                  urlDeletar={URL_DELETAR_FOTO}
                  onUploadSuccess={(nomeArquivo, ct) => onUploadSuccess(nomeArquivo, ct)}
                  onDeleteSuccess={(nomeArquivo, ct) => onDeleteSuccess(nomeArquivo, ct)}
                />
              </div>
              <div className="form-profile">
                <div className="form">
                  <form onSubmit={onSubmitData}>
                    <div className="cadastro mt-3 mb-3">
                      <div className="form-cadastro-usuario">
                        <Input
                          id="codProfessor"
                          label="Código do Usuário:"
                          type="text"
                          value={model.codProfessor}
                          handleChange={(e) => handleChangeField('codProfessor', e.target.value)}
                          handleBlur={() => handleBlurField('codProfessor')}
                          error={errors.codProfessor}
                          errorMensagem={errors.codProfessorMensagem}
                        />
                        <Input
                          id="nomeProfessor"
                          label="Nome:"
                          Icon={FaIcons.FaUserCircle}
                          type="text"
                          value={model.nomeProfessor}
                          handleChange={(e) => handleChangeField('nomeProfessor', e.target.value)}
                          handleBlur={() => handleBlurField('nomeProfessor')}
                          error={errors.nomeProfessor}
                          errorMensagem={errors.nomeProfessorMensagem}
                        />
                        <Input
                          id="email"
                          label="E-mail:"
                          Icon={FaIcons.FaAt}
                          type="text"
                          value={model.email}
                          handleChange={(e) => handleChangeField('email', e.target.value)}
                          handleBlur={() => handleBlurField('email')}
                          error={errors.email}
                          errorMensagem={errors.emailMensagem}
                        />
                        <Input
                          id="senha"
                          label="Senha:"
                          Icon={MdIcons.MdEnhancedEncryption}
                          type="password"
                          value={model.senha}
                          handleChange={(e) => handleChangeField('senha', e.target.value)}
                          handleBlur={() => handleBlurField('senha')}
                          error={errors.senha}
                          errorMensagem={errors.senhaMensagem}
                        />
                        <Input
                          id="confirmSenha"
                          label="Confirme a Senha:"
                          Icon={MdIcons.MdEnhancedEncryption}
                          type="password"
                          value={model.confirmSenha}
                          handleChange={(e) => handleChangeField('confirmSenha', e.target.value)}
                          handleBlur={() => handleBlurField('confirmSenha')}
                          error={errors.confirmSenha}
                          errorMensagem={errors.confirmSenhaMensagem}
                        />
                        <div className="form-cadastro-full">
                          <label className="input-label-full-width app-label" htmlFor="buscar">
                            Cidade:
                          </label>
                          <div className="input-button-group-full-width">
                            <input
                              id="buscar"
                              className="form-control app-label"
                              value={cidadeSelecionada?.nomeCidade || ''}
                              onBlur={() => handleBlurField('idCidade')}
                              readOnly
                            />
                            <button type="button" onClick={() => setIsCidadeModal(true)}>
                              Buscar Cidade
                            </button>
                          </div>
                        </div>
                        <Input
                          id="codProfessor"
                          label="Código do Professor:"
                          type="text"
                          value={model.codProfessor}
                          handleChange={(e) => handleChangeField('codProfessor', e.target.value)}
                          handleBlur={() => handleBlurField('codProfessor')}
                          error={errors.codProfessor}
                          errorMensagem={errors.codProfessorMensagem}
                        />
                        <Input
                          id="nomeProfessor"
                          label="Nome do Professor:"
                          Icon={FaIcons.FaUserCircle}
                          type="text"
                          value={model.nomeProfessor}
                          handleChange={(e) => handleChangeField('nomeProfessor', e.target.value)}
                          handleBlur={() => handleBlurField('nomeProfessor')}
                          error={errors.nomeProfessor}
                          errorMensagem={errors.nomeProfessorMensagem}
                        />

                        <Button
                          id="buttonSubmit"
                          type="submit"
                          title={`Incluir dados do ${PROFESSOR_SHOW}`}
                          variant={SUCCESS}
                          cssClass="app-button app-label mt-3"
                          label={MESSAGE_SAVE_FORM}
                          icon={<FaIcons.FaSave size={BUTTON_SIZE} />}
                        />
                        <LinkButton
                          to={ROTA.PROFESSOR.LISTAR}
                          type="button"
                          title={`Cancelar a inclusão dos dados do ${USUARIO_SHOW}`}
                          variant={WARNING}
                          cssClass="app-button app-label mt-3"
                          label={MESSAGE_CANCEL_FORM}
                          icon={<MdIcons.MdCancel size={BUTTON_SIZE} />}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </Form>
      <Modal isOpen={isCidadeModal} setModalOpen={setIsCidadeModal}>
        <SearchTable<Cidade>
          onClose={() => setIsCidadeModal(false)}
          onSelect={handleSelectCidade}
          title="Selecionar cidade"
          data={listaCidade}
          columns={[
            { key: 'idCidade', label: 'id' },
            { key: 'codCidade', label: 'Código' },
            { key: 'nomeCidade', label: 'Cidade' },
          ]}
          primaryKey="idCidade"
        />
      </Modal>
    </div>
  );
};

export default Alterar;
