import type { Usuario } from '../../../type/Usuario';
import { useApi } from '../ApiConnection';

import { useCallback, useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import { SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { handleApiError } from '../../utils/handlerApiError';

type UseListUsuarioProps = {
  listUsuarios: () => Promise<MensagemServidor<Usuario[]> | undefined>;
  errorGetUsuario: any | any[] | null;
};

const useListUsuarios = (): UseListUsuarioProps => {
  const { getData } = useApi<Usuario>();
  const { setLoading, showAlert } = useAlert();
  const [errorGetUsuario, setErrorGetUsuario] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const listUsuarios = useCallback(async (): Promise<MensagemServidor<Usuario[]> | undefined> => {
    setLoading(true);
    try {
      const response = await getData(ROTA.USUARIO.LISTAR);
      const { mensagem, status } = response.data;
      setErrorGetUsuario(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { dados } = error.response.data;
      setErrorGetUsuario(dados);
      handleApiError(error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [getData, setLoading, showAlert]);

  return {
    listUsuarios,
    errorGetUsuario,
  };
};

export default useListUsuarios;
