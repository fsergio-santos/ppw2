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

type UseGetAlunoProps = {
  findAlunoById: (id: string) => Promise<MensagemServidor<Aluno> | null>;
  errorGetAluno: any | any[] | null;
};

const useGetAluno = (): UseGetAlunoProps => {
  const { getDataById } = useApi<Aluno>();
  const { setLoading, showAlert } = useAlert();
  const [errorGetAluno, setErrorGetAluno] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const findAlunoById = async (id: string): Promise<MensagemServidor<Aluno> | null> => {
    setLoading(true);
    try {
      const response = await getDataById(id, ROTA.ALUNO.POR_ID);
      const { mensagem, status } = response.data;
      setErrorGetAluno(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
    const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorGetAluno(dados);
      showAlert(mensagem, DANGER, TIME);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    findAlunoById,
    errorGetAluno,
  };
};

export default useGetAluno;
