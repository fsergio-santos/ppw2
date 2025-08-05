import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Usuario } from '../../../type/Usuario';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseDeleteUsuarioProps = {
  deleteUsuarioById: (id: string) => Promise<MensagemServidor<Usuario> | undefined>;
  errorDeleteUsuario: any | any[] | null;
};

const useDeleteUsuario = (): UseDeleteUsuarioProps => {
  const { deleteData } = useApi<Usuario>();
  const { setLoading, showAlert } = useAlert();
  const [errorDeleteUsuario, setErrorDeleteUsuario] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const deleteUsuarioById = async (id: string): Promise<MensagemServidor<Usuario> | undefined> => {
    setLoading(true);
    try {
      const response = await deleteData(id, ROTA.USUARIO.EXCLUIR);
      const { mensagem, status } = response.data;
      setErrorDeleteUsuario(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorDeleteUsuario(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteUsuarioById,
    errorDeleteUsuario,
  };
};

export default useDeleteUsuario;
