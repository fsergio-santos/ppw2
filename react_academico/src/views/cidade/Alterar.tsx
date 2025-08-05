import { useEffect, type MouseEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import Loading from '../../components/loading/Loading';
import './cidade.css';

import { useNavigate, useParams } from 'react-router-dom';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';
import useMessageDialog from '../../components/modal/Modal';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosCidade } from '../../rules/CidadeValidationRules';
import useGetCidade from '../../service/connection/cidade/GetCidade';
import useUpdateCidade from '../../service/connection/cidade/UpdateCidade';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  CIDADE,
  CIDADE_SHOW,
  DANGER,
  MESSAGE_CANCEL_FORM,
  MESSAGE_SAVE_FORM,
  SUCCESS,
  TIME,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import { camposObrigatoriosDaCidade, mensagensCamposObrigatoriosDaCidade } from '../../type/Cidade';

const navegcaoCidade = {
  titulo: CIDADE_SHOW,
  descricao: `Alterar os dados da ${CIDADE_SHOW} no sistema`,
  iconTitulo: <FaIcons.FaBuilding size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: CIDADE_SHOW,
  toUrl: ROTA.CIDADE.LISTAR,
};

const Alterar = () => {
  const { id } = useParams();
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
  } = useValidarDadosCidade();
  const { findCidadeById } = useGetCidade();
  const { updateCidade, errorUpdateCidade } = useUpdateCidade();
  const { loading, showAlert } = useAlert();
  const { MessageDialog } = useMessageDialog();

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

  const onSubmitData = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validarFormulario()) {
      showAlert(MENSAGEM_SISTEMA.CIDADE.DANGER, DANGER, TIME);
      return;
    }

    if (!id) return;

    const data = await updateCidade(id, model);
    if (data && data.dados) {
      const errosValidacao = validarCamposVazios(
        data.dados,
        camposObrigatoriosDaCidade,
        mensagensCamposObrigatoriosDaCidade,
      );
      if (!errosValidacao || Object.keys(errosValidacao).length === 0) {
        navigate(ROTA.CIDADE.LISTAR);
      } else {
        setServerErrors(errosValidacao);
      }
      setModel(data.dados);
    } else {
      setErrors(errorUpdateCidade);
      showAlert(MENSAGEM_SISTEMA.CIDADE.DANGER, DANGER, TIME);
    }
  };

  return (
    <Form navegacao={navegcaoCidade}>
      {loading ? <Loading /> : null}
      <div className="container">
        <Box>
          <MessageDialog
            title={`Alteração do ${CIDADE}`}
            body="Tem certeza que deseja alterar o registro "
            label="Confirmar"
            onSave={onSubmitData}
            variant={DANGER}
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
                      handleChange={(e) => handleChangeField('codCidade', e.target.value)}
                      handleBlur={() => handleBlurField('codCidade')}
                      error={errors.codCidade}
                      errorMensagem={errors.codCidadeMensagem}
                    />
                    <Input
                      id="nomeCidade"
                      label="Nome:"
                      type="text"
                      value={model.nomeCidade}
                      handleChange={(e) => handleChangeField('nomeCidade', e.target.value)}
                      handleBlur={() => handleBlurField('nomeCidade')}
                      error={errors.nomeCidade}
                      errorMensagem={errors.nomeCidadeMensagem}
                    />
                  </div>
                  <div className="buttons-form-cadastro-cidade">
                    <Button
                      id="buttonSubmit"
                      type="submit"
                      title={`Incluir dados da ${CIDADE_SHOW}`}
                      variant={SUCCESS}
                      cssClass="btn-lg app-button app-label mt-3 mb-3"
                      label={MESSAGE_SAVE_FORM}
                      icon={<FaIcons.FaSave size={BUTTON_SIZE} />}
                    />
                    <LinkButton
                      to={ROTA.CIDADE.LISTAR}
                      type="button"
                      title={`Cancelar a inclusão dos dados da ${CIDADE_SHOW}`}
                      variant={WARNING}
                      cssClass="btn-lg app-button app-label mt-3 mb-3"
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

export default Alterar;
