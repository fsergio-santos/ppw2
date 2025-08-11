import { useCallback, useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Professor } from '../../../type/Professor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';
import MESSAGES from '../../errors/Mensagens';

type UseListProfessorProps = {
  listProfessores: () => Promise<MensagemServidor<Professor[]> | null>;
  errorGetProfessor: any | any[] | null;
};

const useListProfessores = (): UseListProfessorProps => {
  const { getData } = useApi<Professor>();
  const { setLoading, showAlert } = useAlert();
  const [errorGetProfessor, setErrorGetProfessor] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const listProfessores = useCallback(async (): Promise<MensagemServidor<Professor[]> | null> => {
    setLoading(true);
    try {
      const response = await getData(ROTA.PROFESSOR.LISTAR);
      console.log(response);
      const { mensagem, status } = response.data;
      setErrorGetProfessor(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorGetProfessor(dados);
      showAlert(mensagem, DANGER, TIME);
      return null;
    } finally {
      setLoading(false);
    }
  }, [getData, setLoading, showAlert]);

  return {
    listProfessores,
    errorGetProfessor,
  };
};

export default useListProfessores;
