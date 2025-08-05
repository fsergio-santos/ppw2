import { useState, type FormEvent } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import { useValidarDadosForgot } from '../../../rules/ForgotValidationRules';
import type { Forgot } from '../../../type/Forgot';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { ErrorState } from '../../../type/validation.types';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA_AUT } from '../../constant/Url';
import { MENSAGEM_SISTEMA } from '../../errors/MensagemSistema';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseForgotProps = {
  postForgot: (dados: Forgot) => Promise<MensagemServidor<Forgot> | undefined>;
  errorForgot: any | any[] | null;
  model: Forgot;
  errors: ErrorState<Forgot>;
  handleChangeField: <K extends keyof Forgot>(field: K, value: Forgot[K]) => void;
  handleBlurField: (field: keyof Forgot) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const useForgot = (): UseForgotProps => {
  const { postData } = useApi<Forgot>();
  const { setLoading, showAlert } = useAlert();
  const [errorForgot, setErrorForgot] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();
  const { model, errors, handleChangeField, handleBlurField, validarFormulario } = useValidarDadosForgot();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarFormulario()) {
      showAlert(MENSAGEM_SISTEMA.USUARIO.DANGER, DANGER, TIME);
      return;
    }

    await postForgot(model);
  };

  const postForgot = async (dados: Forgot): Promise<MensagemServidor<Forgot> | undefined> => {
    setLoading(true);
    try {
      const response = await postData(ROTA_AUT.FORGOT_PASSWORD, dados);
      const { mensagem, status } = response.data;
      setErrorForgot(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorForgot(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    postForgot,
    errorForgot,
    model,
    errors,
    handleChangeField,
    handleBlurField,
    handleSubmit,
  };
};

export default useForgot;
