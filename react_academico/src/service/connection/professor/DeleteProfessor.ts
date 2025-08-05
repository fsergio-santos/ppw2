import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Professor } from '../../../type/Professor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApi } from '../ApiConnection';

import { useApiResponseHandler } from '../../hook/ApiResponseHandler';

type UseDeleteProfessorProps = {
  deleteProfessorById: (id: string) => Promise<MensagemServidor<Professor> | undefined>;
  errorDeleteProfessor: any | any[] | null;
};

const useDeleteProfessor = (): UseDeleteProfessorProps => {
  const { deleteData } = useApi<Professor>();
  const { setLoading, showAlert } = useAlert();
  const [errorDeleteProfessor, setErrorDeleteProfessor] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const deleteProfessorById = async (id: string): Promise<MensagemServidor<Professor> | undefined> => {
    setLoading(true);
    try {
      const response = await deleteData(id, ROTA.PROFESSOR.EXCLUIR);
      const { mensagem, status } = response.data;
      setErrorDeleteProfessor(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorDeleteProfessor(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteProfessorById,
    errorDeleteProfessor,
  };
};

export default useDeleteProfessor;
