import { useEffect, useState, type FormEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import Loading from '../../components/loading/Loading';

import Form from '../../components/form/Form';
import './usuario.css';

import Box from '../../components/box/Box';

import { useNavigate } from 'react-router-dom';
import LinkButton from '../../components/LinkButton/LinkButton';
import Select from '../../components/Select/Select';
import Button from '../../components/button/Button';
import ImagemUpload from '../../components/image/ImagemUpload';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/ShowModal';
import SearchTable from '../../components/table/SearchTable';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosUsuario } from '../../rules/UsuarioValidationRules';
import useListCidades from '../../service/connection/cidade/ListCidades';
import useInsertUsuario from '../../service/connection/usuario/InsertUsuario';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  MESSAGE_CANCEL_FORM,
  MESSAGE_SAVE_FORM,
  SUCCESS,
  TIME,
  USUARIO_SHOW,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA, URL_DELETAR_FOTO, URL_SALVAR_FOTO } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import type { Cidade } from '../../type/Cidade';
import { camposObrigatoriosDoUsuario, mensagensCamposObrigatoriosDoUsuario, TIPO_USUARIO } from '../../type/Usuario';

const navegacaoUsuario = {
  titulo: USUARIO_SHOW,
  descricao: `Incluir novo ${USUARIO_SHOW} no sistema`,
  iconTitulo: <FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: USUARIO_SHOW,
  toUrl: ROTA.USUARIO.LISTAR,
};

const Incluir = () => {
  const [isCidadeModal, setIsCidadeModal] = useState<boolean>(false);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<Cidade | null>(null);
  const [listaCidade, setListaCidade] = useState<Cidade[] | null>(null);
  const { loading, showAlert } = useAlert();
  const navigate = useNavigate();
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
  } = useValidarDadosUsuario();

  const { insertUsuario, errorInsertUsuario } = useInsertUsuario();
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
      showAlert(MENSAGEM_SISTEMA.USUARIO.DANGER, DANGER, TIME);
      return;
    }
    const data = await insertUsuario(model);
    if (data && data.dados) {
      const errosValidacao = validarCamposVazios(
        data.dados,
        camposObrigatoriosDoUsuario,
        mensagensCamposObrigatoriosDoUsuario,
      );
      if (!errosValidacao || Object.keys(errosValidacao).length === 0) {
        navigate(ROTA.USUARIO.LISTAR);
      }
      setServerErrors(errosValidacao);
      setModel(data.dados);
    } else {
      setErrors(errorInsertUsuario);
      showAlert(MENSAGEM_SISTEMA.USUARIO.DANGER, DANGER, TIME);
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
    console.log(cidade);
    if (cidadeSelecionada !== null) {
      setModel((prev) => {
        return {
          ...prev,
          idCidade: cidade.idCidade,
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
                        <Select
                          id="tipo"
                          label="Tipo do Usuário:"
                          value={model.tipo}
                          handleChange={(e) => handleChangeField('tipo', e.target.value)}
                          handleBlur={() => handleBlurField('tipo')}
                          array={TIPO_USUARIO}
                          error={errors.tipo}
                          errorMensagem={errors.tipoMensagem}
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
                        {model.tipo === String(TIPO_USUARIO[0].value) && (
                          <>
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
                          </>
                        )}
                        {model.tipo === String(TIPO_USUARIO[1].value) && (
                          <>
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
                          </>
                        )}
                        <Button
                          id="buttonSubmit"
                          type="submit"
                          title={`Incluir dados do ${USUARIO_SHOW}`}
                          variant={SUCCESS}
                          cssClass="app-button app-label mt-3"
                          label={MESSAGE_SAVE_FORM}
                          icon={<FaIcons.FaSave size={BUTTON_SIZE} />}
                        />
                        <LinkButton
                          to={ROTA.USUARIO.LISTAR}
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

export default Incluir;
