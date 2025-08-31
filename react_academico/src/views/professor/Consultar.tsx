import { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import '../../assets/css/usuario.css';
import Box from '../../components/box/Box';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import Loading from '../../components/loading/Loading';
import { useValidarDadosProfessor } from '../../rules/ProfessorValidationRules';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  DEFAULT_IMAGEM,
  MESSAGE_CANCEL_FORM,
  PROFESSOR_SHOW,
  SERVIDOR_POST_IMAGEM,
  TIME,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA } from '../../service/constant/Url';

import { useParams } from 'react-router-dom';
import FotoConsulta from '../../components/image/FotoConsulta';
import LinkButton from '../../components/LinkButton/LinkButton';
import { useAlert } from '../../context/AlertContexto';
import useGetProfessor from '../../service/connection/professor/GetProfessor';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import { camposObrigatoriosDoProfessor, mensagensCamposObrigatoriosDoProfessor } from '../../type/Professor';

const navegacaoProfessor = {
  titulo: PROFESSOR_SHOW,
  descricao: `Consultar dados do ${PROFESSOR_SHOW} do sistema`,
  iconTitulo: <FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: PROFESSOR_SHOW,
  toUrl: ROTA.PROFESSOR.LISTAR,
};

const Consultar = () => {
  const { id } = useParams();
  const { loading, showAlert } = useAlert();
  const { model, setModel, errors, setServerErrors, validarCamposVazios } = useValidarDadosProfessor();
  const { findProfessorById, errorGetProfessor } = useGetProfessor();

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
        }
      }
    }
    getProfessor();
  }, [id]);

  useEffect(() => {
    setServerErrors(errorGetProfessor);
    showAlert(MENSAGEM_SISTEMA.PROFESSOR.DANGER, DANGER, TIME);
  }, [errorGetProfessor]);

  return (
    <Form navegacao={navegacaoProfessor}>
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
                        id="codProfessor"
                        label="Código do Professor:"
                        type="text"
                        value={model.codProfessor}
                        error={errors.codProfessor}
                        errorMensagem={errors.codProfessorMensagem}
                        readonly={true}
                      />
                      <Input
                        id="nomeProfessor"
                        label="Nome do Professor:"
                        Icon={FaIcons.FaUserCircle}
                        type="text"
                        value={model.nomeProfessor}
                        error={errors.nomeProfessor}
                        errorMensagem={errors.nomeProfessorMensagem}
                        readonly={true}
                      />

                      <LinkButton
                        to={ROTA.PROFESSOR.LISTAR}
                        type="button"
                        title={`Cancelar a inclusão dos dados do ${PROFESSOR_SHOW}`}
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

export default Consultar;
