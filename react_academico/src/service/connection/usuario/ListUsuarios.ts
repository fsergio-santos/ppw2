import type { Usuario } from '../../../type/Usuario';
import { useApi } from '../ApiConnection';

import { useCallback, useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import MESSAGES from '../../errors/Mensagens';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';

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
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorGetUsuario(dados);
      showAlert(mensagem, DANGER, TIME);
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
