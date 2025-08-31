import { useEffect, type MouseEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import Form from '../../components/form/Form';
import FotoConsulta from '../../components/image/FotoConsulta';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';
import Loading from '../../components/loading/Loading';
import useMessageDialog from '../../components/modal/Modal';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosUsuario } from '../../rules/UsuarioValidationRules';
import useDeleteUsuario from '../../service/connection/usuario/DeleteUsuario';
import useGetUsuario from '../../service/connection/usuario/GetUsuario';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  DEFAULT_IMAGEM,
  MESSAGE_CANCEL_FORM,
  SERVIDOR_POST_IMAGEM,
  TIME,
  USUARIO,
  USUARIO_SHOW,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import { camposObrigatoriosDoUsuario, mensagensCamposObrigatoriosDoUsuario, TIPO_USUARIO } from '../../type/Usuario';
import '../../assets/css/usuario.css';
const navegacaoModel = {
  titulo: USUARIO_SHOW,
  descricao: `Excluir ${USUARIO_SHOW} do sistema`,
  iconTitulo: <FaIcons.FaTrashAlt size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: USUARIO_SHOW,
  toUrl: ROTA.USUARIO.LISTAR,
};

const Excluir = () => {
  const { id } = useParams();
  const { openModal, MessageDialog } = useMessageDialog();
  const { model, setModel, setServerErrors, validarCamposVazios } = useValidarDadosUsuario();
  const navigate = useNavigate();
  const { loading, showAlert } = useAlert();

  const { findUsuarioById, errorGetUsuario } = useGetUsuario();
  const { deleteUsuarioById, errorDeleteUsuario } = useDeleteUsuario();

  useEffect(() => {
    async function getUsuario() {
      if (id) {
        const data = await findUsuarioById(id);
        if (data && data.dados) {
          setModel(data.dados);
          const errosValidacao = validarCamposVazios(
            data.dados,
            camposObrigatoriosDoUsuario,
            mensagensCamposObrigatoriosDoUsuario,
          );
          if (errosValidacao) {
            setServerErrors(errosValidacao);
          }
        }
      }
    }
    getUsuario();
  }, [id]);

  useEffect(() => {
    if (errorGetUsuario && Object.keys(errorGetUsuario).length > 0) {
      setServerErrors(errorGetUsuario);
      showAlert(MENSAGEM_SISTEMA.USUARIO.DANGER, DANGER, TIME);
    }
  }, [errorGetUsuario]);

  const onSubmitData = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!id) return;

    await deleteUsuarioById(id);

    if (errorDeleteUsuario) {
      showAlert(MENSAGEM_SISTEMA.CIDADE.DELETE, DANGER, TIME);
    } else {
      navigate(ROTA.USUARIO.LISTAR);
    }
  };

  useEffect(() => {
    if (errorDeleteUsuario && Object.keys(errorDeleteUsuario).length > 0) {
      setServerErrors(errorDeleteUsuario);
      showAlert(MENSAGEM_SISTEMA.USUARIO.DANGER, DANGER, TIME);
    }
  }, [errorDeleteUsuario]);

  const tipoUsuario = TIPO_USUARIO.find((item) => String(item.value) === model.tipo)?.name || '';

  return (
    <Form navegacao={navegacaoModel}>
      {loading ? <Loading /> : null}
      <div className="container-usuario">
        <Box>
          <div className="janela">
            <div className="foto avatar-container">
              <FotoConsulta
                foto={model.foto}
                DEFAULT_IMAGEM={DEFAULT_IMAGEM}
                SERVIDOR_POST_IMAGEM={SERVIDOR_POST_IMAGEM}
              />
            </div>

            <MessageDialog
              title={`Exclusão do ${USUARIO}`}
              body="Tem certeza que deseja excluir o registro "
              label="Confirmar"
              onSave={onSubmitData}
              variant={WARNING}
              iconConfirm={<MdIcons.MdBrowserUpdated />}
              iconCancel={<MdIcons.MdCancel />}
            />
            <div className="form-profile">
              <div className="form">
                <form>
                  <div className="cadastro mt-3 mb-3">
                    <div className="form-cadastro-usuario">
                      <Input id="codUsuario" label="Código do Usuário:" type="text" value={model.codUsuario} />
                      <Input
                        id="nomeUsuario"
                        label="Nome:"
                        Icon={FaIcons.FaUserCircle}
                        type="text"
                        value={model.nomeUsuario}
                      />
                      <Input id="email" label="E-mail:" Icon={FaIcons.FaAt} type="text" value={model.email} />
                      <Input
                        id="senha"
                        label="Senha:"
                        Icon={MdIcons.MdEnhancedEncryption}
                        type="password"
                        value={model.senha}
                      />
                      <Input
                        id="confirmSenha"
                        label="Confirme a Senha:"
                        Icon={MdIcons.MdEnhancedEncryption}
                        type="password"
                        value={model.confirmSenha}
                      />
                      <Input id="tipo" label="Tipo Usuário" value={tipoUsuario} readonly={true} />
                      <Input id="idCidade" label="Cidade:" value={model.nomeCidade} readonly={true} />
                      <div></div>
                      {String(model.tipo) === '2' && (
                        <>
                          <Input
                            id="codAluno"
                            label="Código do Aluno:"
                            type="text"
                            value={model.codAluno}
                            readonly={true}
                          />
                          <Input
                            id="nomeAluno"
                            label="Nome do Aluno:"
                            Icon={FaIcons.FaUserCircle}
                            type="text"
                            value={model.nomeAluno}
                            readonly={true}
                          />
                          <Input id="idade" label="Idade do Aluno:" type="text" value={model.idade} readonly={true} />
                          <div></div>
                        </>
                      )}
                      {String(model.tipo) === '1' && (
                        <>
                          <Input
                            id="codProfessor"
                            label="Nome do Professor:"
                            type="text"
                            value={model.codProfessor}
                            readonly={true}
                          />
                          <Input
                            id="nomeProfessor"
                            label="Nome do Professor:"
                            Icon={FaIcons.FaUserCircle}
                            type="text"
                            value={model.nomeProfessor}
                            readonly={true}
                          />
                        </>
                      )}
                      <Button
                        id="buttonSubmit"
                        type="button"
                        title={`Excluir dados do seu ${USUARIO_SHOW}`}
                        variant={DANGER}
                        cssClass="btn-lg app-button app-label mt-2"
                        label="Excluir Cadastro"
                        icon={<FaIcons.FaTrashAlt size={BUTTON_SIZE} />}
                        onClick={openModal}
                      />
                      <LinkButton
                        to={ROTA.USUARIO.LISTAR}
                        type="button"
                        title={`Cancelar a exclusão do ${USUARIO_SHOW}`}
                        variant={WARNING}
                        cssClass="btn-lg app-button app-label mt-2"
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
