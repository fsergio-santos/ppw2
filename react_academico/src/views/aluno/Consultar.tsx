import { useEffect, useState, type FormEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import Loading from '../../components/loading/Loading';
import './usuario.css';
import Form from '../../components/form/Form';
import Box from '../../components/box/Box';
import { useValidarDadosAluno } from '../../rules/AlunoValidationRules';
import {
  ALUNO_SHOW,
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  DEFAULT_IMAGEM,
  MESSAGE_CANCEL_FORM,
  SERVIDOR_POST_IMAGEM,
  TIME,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA } from '../../service/constant/Url';
import Input from '../../components/input/Input';

import LinkButton from '../../components/LinkButton/LinkButton';
import { useAlert } from '../../context/AlertContexto';
import useGetAluno from '../../service/connection/aluno/GetAluno';
import { useParams } from 'react-router-dom';
import FotoConsulta from '../../components/image/FotoConsulta';
import { camposObrigatoriosDoAluno, mensagensCamposObrigatoriosDoAluno } from '../../type/Aluno';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';

const navegacaoAluno = {
  titulo: ALUNO_SHOW,
  descricao: `Excluir ${ALUNO_SHOW} do sistema`,
  iconTitulo: <FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: ALUNO_SHOW,
  toUrl: ROTA.ALUNO.LISTAR,
};

const Consultar = () => {
  const { id } = useParams();
  const { loading, showAlert } = useAlert();
  const { model, setModel, errors, setServerErrors, validarCamposVazios } = useValidarDadosAluno();
  const { findAlunoById, errorGetAluno } = useGetAluno();

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
          if (errosValidacao){
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

                      <LinkButton
                        to={ROTA.ALUNO.LISTAR}
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

export default Consultar;
