import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { Login } from '../../../type/Login';
import type { LoginResponse } from '../../../type/LoginResponse';
import { DANGER, TIME } from '../../constant/Constantes';
import { ROTA_AUT } from '../../constant/Url';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';
import MESSAGES from '../../errors/Mensagens';

type UseGetLogin = {
  getLogin: (dados: Login) => Promise<void | undefined>;
  errorGetLogin: any | any[] | null;
};

const useGetLogin = (): UseGetLogin => {
  const { postData } = useApi<LoginResponse>();
  const { setLoading, showAlert } = useAlert();
  const [errorGetLogin, setErrorGetLogin] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const getLogin = async (dados: Login): Promise<void | undefined> => {
    setLoading(true);
    try {
      await postData(ROTA_AUT.LOGIN, dados);
    } catch (error: any) {
     const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorGetLogin(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    getLogin,
    errorGetLogin,
  };
};

export default useGetLogin;
