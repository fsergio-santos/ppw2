import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Usuario } from '../../../type/Usuario';
import { SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { handleApiError } from '../../utils/handlerApiError';
import { useApi } from '../ApiConnection';

type UseGetUsuarioProps = {
  findUsuarioById: (id: string) => Promise<MensagemServidor<Usuario> | null>;
  errorGetUsuario: any | any[] | null;
};

const useGetUsuario = (): UseGetUsuarioProps => {
  const { getDataById } = useApi<Usuario>();
  const { setLoading, showAlert } = useAlert();
  const [errorGetUsuario, setErrorGetUsuario] = useState<any | any[] | null>(null);

  const findUsuarioById = async (id: string): Promise<MensagemServidor<Usuario> | null> => {
    setLoading(true);
    try {
      const response = await getDataById(id, ROTA.USUARIO.POR_ID);
      const { mensagem, status } = response.data;
      setErrorGetUsuario(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { dados } = error.response.data;
      setErrorGetUsuario(dados);
      handleApiError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    findUsuarioById,
    errorGetUsuario,
  };
};

export default useGetUsuario;
