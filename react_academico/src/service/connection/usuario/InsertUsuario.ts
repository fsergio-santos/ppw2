import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Usuario } from '../../../type/Usuario';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseInsertUsuarioProps = {
  insertUsuario: (dados: Usuario) => Promise<MensagemServidor<Usuario> | undefined>;
  errorInsertUsuario: any | any[] | null;
};

const useInsertUsuario = (): UseInsertUsuarioProps => {
  const { postData } = useApi<Usuario>();
  const { setLoading, showAlert } = useAlert();
  const { tratarErrosApi } = useApiResponseHandler();
  const [errorInsertUsuario, setErrorInsertUsuario] = useState<any | any[] | null>(null);

  const insertUsuario = async (dados: Usuario): Promise<MensagemServidor<Usuario> | undefined> => {
    setLoading(true);
    try {
      const response = await postData(ROTA.USUARIO.CRIAR, dados);
      const { mensagem, status } = response.data;
      setErrorInsertUsuario(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorInsertUsuario(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    insertUsuario,
    errorInsertUsuario,
  };
};

export default useInsertUsuario;

/*       if (error?.response?.data?.status === HTTP_UNPROCESSABLE_ENTITY) {
        const { status, mensagem, dados } = error.response.data;
        setErrorInsertUsuario(dados);
        const msg = mensagem || getMessageByStatus(status);
        showAlert(msg, DANGER, TIME);
      } else if (error?.response?.data) {
        const { mensagem, status } = error.response.data;
        const msg = mensagem || getMessageByType(status);
        showAlert(msg, DANGER, TIME);
      } else {
        showAlert(getMessageByType(error?.response?.status), DANGER, TIME);
      } */
