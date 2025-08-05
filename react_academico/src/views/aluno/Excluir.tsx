import { useEffect, type MouseEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import Loading from '../../components/loading/Loading';

import Form from '../../components/form/Form';
import './usuario.css';

import Box from '../../components/box/Box';

import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import FotoConsulta from '../../components/image/FotoConsulta';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';
import useMessageDialog from '../../components/modal/Modal';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosAluno } from '../../rules/AlunoValidationRules';
import useDeleteAluno from '../../service/connection/aluno/DeleteAluno';
import useGetAluno from '../../service/connection/aluno/GetAluno';
import {
  ALUNO,
  ALUNO_SHOW,
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  DEFAULT_IMAGEM,
  MESSAGE_CANCEL_FORM,
  MESSAGE_DELETE_FORM,
  SERVIDOR_POST_IMAGEM,
  TIME,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import { camposObrigatoriosDoAluno, mensagensCamposObrigatoriosDoAluno } from '../../type/Aluno';

const navegacaoAluno = {
  titulo: ALUNO_SHOW,
  descricao: `Excluir ${ALUNO_SHOW} do sistema`,
  iconTitulo: <FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: ALUNO_SHOW,
  toUrl: ROTA.ALUNO.LISTAR,
};

const Excluir = () => {
  const { id } = useParams();
  const { loading, showAlert } = useAlert();
  const { model, setModel, errors, setServerErrors, validarCamposVazios } = useValidarDadosAluno();
  const { findAlunoById, errorGetAluno } = useGetAluno();
  const { deleteAlunoById, errorDeleteAluno } = useDeleteAluno();
  const { MessageDialog } = useMessageDialog();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAluno() {
      if (id) {
        const data = await findAlunoById(id);
        if (data && data.dados) {
          const errosValidacao = validarCamposVazios(
            data.dados,
            camposObrigatoriosDoAluno,
            mensagensCamposObrigatoriosDoAluno,
          );
          if (errosValidacao) {
            setServerErrors(errosValidacao);
          }
          setModel(data.dados);
        }
      }
    }
    getAluno();
  }, [id]);

  useEffect(() => {
    if (errorGetAluno && Object.keys(errorGetAluno).length > 0) {
      setServerErrors(errorGetAluno);
      showAlert(MENSAGEM_SISTEMA.ALUNO.DANGER, DANGER, TIME);
    }
  }, [errorGetAluno]);

  const onSubmitData = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteAlunoById(model.idAluno);
    if (errorDeleteAluno) {
      showAlert(MENSAGEM_SISTEMA.ALUNO.DELETE, DANGER, TIME);
    } else {
      navigate(ROTA.ALUNO.LISTAR);
    }
  };

  useEffect(() => {
    if (errorDeleteAluno && Object.keys(errorDeleteAluno).length > 0) {
      setServerErrors(errorDeleteAluno);
      showAlert(MENSAGEM_SISTEMA.ALUNO.DANGER, DANGER, TIME);
    }
  }, [errorDeleteAluno]);

  return (
    <Form navegacao={navegacaoAluno}>
      {loading ? <Loading /> : null}
      <div className="container-usuario">
        <Box>
          <div className="janela">
            <div className="foto avatar-container ">
              <FotoConsulta
                foto={model.foto}
                DEFAULT_IMAGEM={DEFAULT_IMAGEM}
                SERVIDOR_POST_IMAGEM={SERVIDOR_POST_IMAGEM}
              />
              <MessageDialog
                title={`Exclusão do ${ALUNO}`}
                body="Tem certeza que deseja excluir o registro "
                label="Confirmar"
                onSave={onSubmitData}
                variant={WARNING}
                iconConfirm={<MdIcons.MdBrowserUpdated />}
                iconCancel={<MdIcons.MdCancel />}
              />
            </div>

            <div className="form-profile">
              <div className="form">
                <form>
                  <div className="cadastro mt-3 mb-3">
                    <div className="form-cadastro-usuario">
                      <Input
                        id="codUsuario"
                        label="Código do Usuário:"
                        type="text"
                        value={model.codUsuario}
                        error={errors.codUsuario}
                        errorMensagem={errors.codUsuarioMensagem}
                        readonly={true}
                      />
                      <Input
                        id="nomeUsuario"
                        label="Nome:"
                        Icon={FaIcons.FaUserCircle}
                        type="text"
                        value={model.nomeUsuario}
                        error={errors.nomeUsuario}
                        errorMensagem={errors.nomeUsuarioMensagem}
                        readonly={true}
                      />
                      <Input
                        id="email"
                        label="E-mail:"
                        Icon={FaIcons.FaAt}
                        type="text"
                        value={model.email}
                        error={errors.email}
                        errorMensagem={errors.emailMensagem}
                        readonly={true}
                      />
                      <Input
                        id="senha"
                        label="Senha:"
                        Icon={MdIcons.MdEnhancedEncryption}
                        type="password"
                        value={model.senha}
                        error={errors.senha}
                        errorMensagem={errors.senhaMensagem}
                        readonly={true}
                      />
                      <Input
                        id="confirmSenha"
                        label="Confirme a Senha:"
                        Icon={MdIcons.MdEnhancedEncryption}
                        type="password"
                        value={model.confirmSenha}
                        error={errors.confirmSenha}
                        errorMensagem={errors.confirmSenhaMensagem}
                        readonly={true}
                      />
                      <div className="form-cadastro-full">
                        <label className="input-label-full-width app-label" htmlFor="buscar">
                          Cidade:
                        </label>
                        <div className="input-button-group-full-width">
                          <input
                            id="buscar"
                            className="form-control app-label"
                            defaultValue={model.nomeCidade || ''}
                            readOnly
                          />
                        </div>
                      </div>
                      <Input
                        id="codAluno"
                        label="Código do Aluno:"
                        type="text"
                        value={model.codAluno}
                        error={errors.codAluno}
                        errorMensagem={errors.codAlunoMensagem}
                        readonly={true}
                      />
                      <Input
                        id="nomeAluno"
                        label="Nome do Aluno:"
                        Icon={FaIcons.FaUserCircle}
                        type="text"
                        value={model.nomeAluno}
                        error={errors.nomeAluno}
                        errorMensagem={errors.nomeAlunoMensagem}
                        readonly={true}
                      />
                      <Input
                        id="idade"
                        label="Idade do Aluno:"
                        type="text"
                        value={model.idade}
                        error={errors.idade}
                        errorMensagem={errors.idadeMensagem}
                        readonly={true}
                      />
                      <div></div>

                      <Button
                        id="buttonSubmit"
                        type="submit"
                        title={`Incluir dados do ${ALUNO_SHOW}`}
                        variant={DANGER}
                        cssClass="app-button app-label mt-3"
                        label={MESSAGE_DELETE_FORM}
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
  );
};

export default Excluir;
