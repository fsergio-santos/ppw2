import { useState, type FormEvent } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import { useValidarDadosReset } from '../../../rules/ResetValidationRules';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Reset } from '../../../type/Reset';
import type { ErrorState } from '../../../type/validation.types';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA_AUT } from '../../constant/Url';
import { MENSAGEM_SISTEMA } from '../../errors/MensagemSistema';
import MESSAGES from '../../errors/Mensagens';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type ResetProps = {
  //postReset: (dados: Reset) => Promise<MensagemServidor<Reset> | undefined>;
  errorReset: any | any[] | null;
  model: Reset;
  errors: ErrorState<Reset>;
  handleChangeField: <K extends keyof Reset>(field: K, value: Reset[K]) => void;
  handleBlurField: (field: keyof Reset) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const useReset = (): ResetProps => {
  const { postData } = useApi<Reset>();
  const { setLoading, showAlert } = useAlert();
  const [errorReset, setErrorReset] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();
  const { model, errors, handleChangeField, handleBlurField, validarFormulario } = useValidarDadosReset();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarFormulario()) {
      showAlert(MENSAGEM_SISTEMA.USUARIO.DANGER, DANGER, TIME);
      return;
    }

    await postReset(model);
  };

  const postReset = async (dados: Reset): Promise<MensagemServidor<Reset> | undefined> => {
    setLoading(true);
    try {
      const response = await postData(ROTA_AUT.RESET_PASSWORD, dados);
      const { mensagem, status } = response.data;
      setErrorReset(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorReset(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    // postReset,
    errorReset,
    model,
    errors,
    handleChangeField,
    handleBlurField,
    handleSubmit,
  };
};

export default useReset;
