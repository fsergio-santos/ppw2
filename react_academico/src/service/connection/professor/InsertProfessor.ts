import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Professor } from '../../../type/Professor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';
import MESSAGES from '../../errors/Mensagens';

type UseInsertProfessorProps = {
  insertProfessor: (dados: Professor) => Promise<MensagemServidor<Professor> | undefined>;
  errorInsertProfessor: any | any[] | null;
};

const useInsertProfessor = (): UseInsertProfessorProps => {
  const { postData } = useApi<Professor>();
  const { setLoading, showAlert } = useAlert();
  const [errorInsertProfessor, setErrorInsertProfessor] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const insertProfessor = async (dados: Professor): Promise<MensagemServidor<Professor> | undefined> => {
    setLoading(true);
    try {
      const response = await postData(ROTA.PROFESSOR.CRIAR, dados);
      const { mensagem, status } = response.data;
      setErrorInsertProfessor(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorInsertProfessor(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    insertProfessor,
    errorInsertProfessor,
  };
};

export default useInsertProfessor;
