import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { Aluno } from '../../../type/Aluno';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseInsertAlunoProps = {
  insertAluno: (dados: Aluno) => Promise<MensagemServidor<Aluno> | undefined>;
  errorInsertAluno: any | any[] | null;
};

const useInsertAluno = (): UseInsertAlunoProps => {
  const { postData } = useApi<Aluno>();
  const { setLoading, showAlert } = useAlert();
  const [errorInsertAluno, setErrorInsertAluno] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const insertAluno = async (dados: Aluno): Promise<MensagemServidor<Aluno> | undefined> => {
    setLoading(true);
    try {
      const response = await postData(ROTA.ALUNO.CRIAR, dados);
      const { mensagem, status } = response.data;
      setErrorInsertAluno(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorInsertAluno(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    insertAluno,
    errorInsertAluno,
  };
};

export default useInsertAluno;
