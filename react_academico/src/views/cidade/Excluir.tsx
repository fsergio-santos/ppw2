import { useEffect, type MouseEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';
import useMessageDialog from '../../components/modal/Modal';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosCidade } from '../../rules/CidadeValidationRules';
import useDeleteCidade from '../../service/connection/cidade/DeleteCidade';
import useGetCidade from '../../service/connection/cidade/GetCidade';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  CIDADE,
  CIDADE_SHOW,
  DANGER,
  MESSAGE_CANCEL_FORM,
  MESSAGE_DELETE_FORM,
  TIME,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import { camposObrigatoriosDaCidade, mensagensCamposObrigatoriosDaCidade } from '../../type/Cidade';
import './cidade.css';

const navegacaoCidade = {
  titulo: CIDADE_SHOW,
  descricao: `Excluir dados da ${CIDADE_SHOW} no sistema`,
  iconTitulo: <FaIcons.FaBuilding size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: CIDADE_SHOW,
  toUrl: ROTA.CIDADE.LISTAR,
};

const Excluir = () => {
  const { id } = useParams();

  const { model, setModel, errors, setServerErrors, validarCamposVazios } = useValidarDadosCidade();
  const { findCidadeById, errorGetCidade } = useGetCidade();
  const { deleteCidadeById, errorDeleteCidade } = useDeleteCidade();
  const { openModal, MessageDialog } = useMessageDialog();
  const { loading, showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCidade() {
      if (id) {
        const data = await findCidadeById(id);
        if (data && data.dados) {
          const errosValidacao = validarCamposVazios(
            data.dados,
            camposObrigatoriosDaCidade,
            mensagensCamposObrigatoriosDaCidade,
          );
          if (errosValidacao) {
            setServerErrors(errosValidacao);
          }
          setModel(data.dados);
        }
      }
    }
    getCidade();
  }, [id]);

  useEffect(() => {
    if (errorGetCidade && Object.keys(errorGetCidade).length > 0) {
      setServerErrors(errorGetCidade);
      showAlert(MENSAGEM_SISTEMA.CIDADE.DANGER, DANGER, TIME);
    }
  }, [errorGetCidade]);

  const onSubmitData = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteCidadeById(model.idCidade);
    if (errorDeleteCidade) {
      showAlert(MENSAGEM_SISTEMA.CIDADE.DELETE, DANGER, TIME);
    } else {
      navigate(ROTA.CIDADE.LISTAR);
    }
  };

  useEffect(() => {
    if (errorDeleteCidade && Object.keys(errorDeleteCidade).length > 0) {
      setServerErrors(errorDeleteCidade);
      showAlert(MENSAGEM_SISTEMA.CIDADE.DANGER, DANGER, TIME);
    }
  }, [errorDeleteCidade]);

  return (
    <Form navegacao={navegacaoCidade}>
      {loading ? <Loading /> : null}
      <div className="container">
        <Box>
          <MessageDialog
            title={`Exclusão do ${CIDADE}`}
            body="Tem certeza que deseja excluir o registro "
            label="Confirmar"
            onSave={onSubmitData}
            variant={WARNING}
            iconConfirm={<MdIcons.MdBrowserUpdated />}
            iconCancel={<MdIcons.MdCancel />}
          />
          <div className="form">
            <form>
              <div className="cadastro mt-3 mb-3">
                <div className="form-cadastro-cidade">
                  <div className="inputs-form-cadastro-cidade mt-3">
                    <Input
                      id="codCidade"
                      label="Código da Cidade:"
                      type="text"
                      value={model.codCidade}
                      error={errors.codCidade}
                      errorMensagem={errors.codCidadeMensagem}
                      readonly={true}
                    />
                    <Input
                      id="nomeCidade"
                      label="Nome:"
                      type="text"
                      value={model.nomeCidade}
                      readonly={true}
                      error={errors.nomeCidade}
                      errorMensagem={errors.nomeCidadeMensagem}
                    />
                  </div>
                  <div className="buttons-form-cadastro-cidade">
                    <Button
                      id="buttonSubmit"
                      type="button"
                      title={`Excluir dados da ${CIDADE_SHOW}`}
                      variant={DANGER}
                      cssClass="btn-lg app-button app-label mt-2"
                      label={MESSAGE_DELETE_FORM}
                      icon={<FaIcons.FaTrash size={BUTTON_SIZE} />}
                      onClick={openModal}
                    />
                    <LinkButton
                      to={ROTA.CIDADE.LISTAR}
                      type="button"
                      title={`Cancelar exclusão dos dados da ${CIDADE_SHOW}`}
                      variant={WARNING}
                      cssClass="btn-lg app-button app-label mt-2"
                      label={MESSAGE_CANCEL_FORM}
                      icon={<MdIcons.MdCancel size={BUTTON_SIZE} />}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </div>
    </Form>
  );
};

export default Excluir;
