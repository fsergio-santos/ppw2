import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Professor } from '../../../type/Professor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseGetProfessorProps = {
  findProfessorById: (id: string) => Promise<MensagemServidor<Professor> | null>;
  errorGetProfessor: any | any[] | null;
};

const useGetProfessor = (): UseGetProfessorProps => {
  const { getDataById } = useApi<Professor>();
  const { setLoading, showAlert } = useAlert();
  const [errorGetProfessor, setErrorGetProfessor] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const findProfessorById = async (id: string): Promise<MensagemServidor<Professor> | null> => {
    setLoading(true);
    try {
      const response = await getDataById(id, ROTA.PROFESSOR.POR_ID);
      const { mensagem, status } = response.data;
      setErrorGetProfessor(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorGetProfessor(dados);
      showAlert(mensagem, DANGER, TIME);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    findProfessorById,
    errorGetProfessor,
  };
};

export default useGetProfessor;
