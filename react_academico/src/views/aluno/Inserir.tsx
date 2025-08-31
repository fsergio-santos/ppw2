import { useEffect, useState, type FormEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import Loading from '../../components/loading/Loading';

import '../../assets/css/usuario.css';
import Form from '../../components/form/Form';

import Box from '../../components/box/Box';

import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import ImagemUpload from '../../components/image/ImagemUpload';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';
import Modal from '../../components/modal/ShowModal';
import SearchTable from '../../components/table/SearchTable';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosAluno } from '../../rules/AlunoValidationRules';
import useInsertAluno from '../../service/connection/aluno/InsertAluno';
import useListCidades from '../../service/connection/cidade/ListCidades';
import {
  ALUNO_SHOW,
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  MESSAGE_CANCEL_FORM,
  MESSAGE_SAVE_FORM,
  SUCCESS,
  TIME,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA, URL_DELETAR_FOTO, URL_SALVAR_FOTO } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import { camposObrigatoriosDoAluno, mensagensCamposObrigatoriosDoAluno } from '../../type/Aluno';
import type { Cidade } from '../../type/Cidade';

const navegacaoUsuario = {
  titulo: ALUNO_SHOW,
  descricao: `Incluir novo ${ALUNO_SHOW} no sistema`,
  iconTitulo: <FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: ALUNO_SHOW,
  toUrl: ROTA.ALUNO.LISTAR,
};

const Incluir = () => {
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
  } = useValidarDadosAluno();
  const navigate = useNavigate();
  const { insertAluno, errorInsertAluno } = useInsertAluno();
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

  const onSubmitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarFormulario()) {
      showAlert(MENSAGEM_SISTEMA.ALUNO.DANGER, DANGER, TIME);
      return;
    }

    const data = await insertAluno(model);

    if (data && data.dados) {
      const errosValidacao = validarCamposVazios(
        data.dados,
        camposObrigatoriosDoAluno,
        mensagensCamposObrigatoriosDoAluno,
      );
      if (!errosValidacao || Object.keys(errosValidacao).length === 0) {
        navigate(ROTA.ALUNO.LISTAR);
      } else {
        setServerErrors(errosValidacao);
      }
      setModel(data.dados);
    } else {
      setErrors(errorInsertAluno);
      showAlert(MENSAGEM_SISTEMA.ALUNO.DANGER, DANGER, TIME);
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
      <Form navegacao={navegacaoUsuario}>
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
                          id="codUsuario"
                          label="Código do Usuário:"
                          type="text"
                          value={model.codUsuario}
                          handleChange={(e) => handleChangeField('codUsuario', e.target.value)}
                          handleBlur={() => handleBlurField('codUsuario')}
                          error={errors.codUsuario}
                          errorMensagem={errors.codUsuarioMensagem}
                        />
                        <Input
                          id="nomeUsuario"
                          label="Nome:"
                          Icon={FaIcons.FaUserCircle}
                          type="text"
                          value={model.nomeUsuario}
                          handleChange={(e) => handleChangeField('nomeUsuario', e.target.value)}
                          handleBlur={() => handleBlurField('nomeUsuario')}
                          error={errors.nomeUsuario}
                          errorMensagem={errors.nomeUsuarioMensagem}
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
                          id="codAluno"
                          label="Código do Aluno:"
                          type="text"
                          value={model.codAluno}
                          handleChange={(e) => handleChangeField('codAluno', e.target.value)}
                          handleBlur={() => handleBlurField('codAluno')}
                          error={errors.codAluno}
                          errorMensagem={errors.codAlunoMensagem}
                        />
                        <Input
                          id="nomeAluno"
                          label="Nome do Aluno:"
                          Icon={FaIcons.FaUserCircle}
                          type="text"
                          value={model.nomeAluno}
                          handleChange={(e) => handleChangeField('nomeAluno', e.target.value)}
                          handleBlur={() => handleBlurField('nomeAluno')}
                          error={errors.nomeAluno}
                          errorMensagem={errors.nomeAlunoMensagem}
                        />
                        <Input
                          id="idade"
                          label="Idade do Aluno:"
                          type="text"
                          value={model.idade}
                          handleChange={(e) => handleChangeField('idade', e.target.value)}
                          handleBlur={() => handleBlurField('idade')}
                          error={errors.idade}
                          errorMensagem={errors.idadeMensagem}
                        />
                        <div></div>

                        <Button
                          id="buttonSubmit"
                          type="submit"
                          title={`Incluir dados do ${ALUNO_SHOW}`}
                          variant={SUCCESS}
                          cssClass="app-button app-label mt-3"
                          label={MESSAGE_SAVE_FORM}
                          icon={<FaIcons.FaSave size={BUTTON_SIZE} />}
                        />
                        <LinkButton
                          to={ROTA.PROFESSOR.LISTAR}
                          type="button"
                          title={`Cancelar a inclusão dos dados do ${ALUNO_SHOW}`}
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

export default Incluir;
