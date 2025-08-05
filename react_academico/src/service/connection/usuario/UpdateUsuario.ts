import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Usuario } from '../../../type/Usuario';
import { SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { handleApiError } from '../../utils/handlerApiError';
import { useApi } from '../ApiConnection';

type UseUpdateUsuarioProps = {
  updateUsuario: (id: string, dados: Usuario) => Promise<MensagemServidor<Usuario> | undefined>;
  errorUpdateUsuario: any | any[] | null;
};

const useUpdateUsuario = (): UseUpdateUsuarioProps => {
  const { putData } = useApi<Usuario>();
  const { setLoading, showAlert } = useAlert();
  const [errorUpdateUsuario, setErrorUpdateUsuario] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const updateUsuario = async (id: string | number, dados: Usuario): Promise<MensagemServidor<Usuario> | undefined> => {
    setLoading(true);
    try {
      const response = await putData(id, ROTA.USUARIO.ATUALIZAR, dados);
      const { mensagem, status } = response.data;
      setErrorUpdateUsuario(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { dados } = error.response.data;
      setErrorUpdateUsuario(dados);
      handleApiError(error);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    updateUsuario,
    errorUpdateUsuario,
  };
};

export default useUpdateUsuario;
