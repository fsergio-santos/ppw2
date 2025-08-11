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

type UseUpdateAlunoProps = {
  updateAluno: (dados: Aluno) => Promise<MensagemServidor<Aluno> | undefined>;
  errorUpdateAluno: any | any[] | null;
};

const useUpdateAluno = (): UseUpdateAlunoProps => {
  const { postData } = useApi<Aluno>();
  const { setLoading, showAlert } = useAlert();
  const [errorUpdateAluno, setErrorUpdateAluno] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const updateAluno = async (dados: Aluno): Promise<MensagemServidor<Aluno> | undefined> => {
    setLoading(true);
    try {
      const response = await postData(ROTA.ALUNO.CRIAR, dados);
      const { mensagem, status } = response.data;
      setErrorUpdateAluno(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorUpdateAluno(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    updateAluno,
    errorUpdateAluno,
  };
};

export default useUpdateAluno;
