import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { Cidade } from '../../../type/Cidade';
import { DANGER, TIME } from '../../constant/Constantes';
import { ROTA_AUT } from '../../constant/Url';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApiAuth } from '../ApiConnection';

type UseLogoutProps = {
  getLogout: () => Promise<void | undefined>;
  errorLogout: any | any[] | null;
};

const useLogout = (): UseLogoutProps => {
  const { postLogout } = useApiAuth<Cidade>();
  const { setLoading, showAlert } = useAlert();
  const { tratarErrosApi } = useApiResponseHandler();
  const [errorLogout, setErrorLogout] = useState<any | any[] | null>(null);

  const getLogout = async (): Promise<void | undefined> => {
    setLoading(true);
    try {
      await postLogout(ROTA_AUT.LOGOUT);
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorLogout(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    getLogout,
    errorLogout,
  };
};

export default useLogout;
