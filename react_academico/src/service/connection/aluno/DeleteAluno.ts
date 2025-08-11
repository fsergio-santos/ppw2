import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { Aluno } from '../../../type/Aluno';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';
import MESSAGES from '../../errors/Mensagens';

type UseDeleteAlunoProps = {
  deleteAlunoById: (id: string) => Promise<MensagemServidor<Aluno> | undefined>;
  errorDeleteAluno: any | any[] | null;
};

const useDeleteAluno = (): UseDeleteAlunoProps => {
  const { deleteData } = useApi<Aluno>();
  const { setLoading, showAlert } = useAlert();
  const [errorDeleteAluno, setErrorDeleteAluno] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const deleteAlunoById = async (id: string): Promise<MensagemServidor<Aluno> | undefined> => {
    setLoading(true);
    try {
      const response = await deleteData(id, ROTA.ALUNO.EXCLUIR);
      const { mensagem, status } = response.data;
      setErrorDeleteAluno(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorDeleteAluno(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteAlunoById,
    errorDeleteAluno,
  };
};

export default useDeleteAluno;
