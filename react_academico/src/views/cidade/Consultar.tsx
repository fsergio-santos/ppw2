import { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Box from '../../components/box/Box';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';
import Loading from '../../components/loading/Loading';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosCidade } from '../../rules/CidadeValidationRules';
import useGetCidade from '../../service/connection/cidade/GetCidade';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  CIDADE_SHOW,
  DANGER,
  MESSAGE_CANCEL_FORM,
  TIME,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import { camposObrigatoriosDaCidade, mensagensCamposObrigatoriosDaCidade } from '../../type/Cidade';
import './cidade.css';

const navegacaoCidade = {
  titulo: CIDADE_SHOW,
  descricao: `Consultar dados da ${CIDADE_SHOW} no sistema`,
  iconTitulo: <FaIcons.FaBuilding size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: CIDADE_SHOW,
  toUrl: ROTA.CIDADE.LISTAR,
};

const Consultar = () => {
  const { id } = useParams();

  const { model, setModel, errors, setServerErrors, validarCamposVazios } = useValidarDadosCidade();
  const { findCidadeById, errorGetCidade } = useGetCidade();
  const { loading, showAlert } = useAlert();

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

  return (
    <Form navegacao={navegacaoCidade}>
      {loading ? <Loading /> : null}
      <div className="container">
        <Box>
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
                      error={errors.nomeCidade}
                      errorMensagem={errors.nomeCidadeMensagem}
                      readonly={true}
                    />
                  </div>
                  <div className="buttons-form-cadastro-cidade">
                    <LinkButton
                      to={ROTA.CIDADE.LISTAR}
                      type="button"
                      title={`Cancelar Alteração dados da ${CIDADE_SHOW}`}
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

export default Consultar;
