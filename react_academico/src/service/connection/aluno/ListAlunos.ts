import type { Aluno } from '../../../type/Aluno';
import { useApi } from '../ApiConnection';

import { useCallback, useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import MESSAGES from '../../errors/Mensagens';

type UseListAlunoProps = {
  listAlunos: () => Promise<MensagemServidor<Aluno[]> | null>;
  errorGetAlunos: any | any[] | null;
};

const useListAlunos = (): UseListAlunoProps => {
  const { getData } = useApi<Aluno>();
  const { setLoading, showAlert } = useAlert();
  const [errorGetAlunos, setErrorGetAlunos] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const listAlunos = useCallback(async (): Promise<MensagemServidor<Aluno[]> | null> => {
    setLoading(true);
    try {
      const response = await getData(ROTA.ALUNO.LISTAR);
      const { mensagem, status } = response.data;
      setErrorGetAlunos(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorGetAlunos(dados);
      showAlert(mensagem, DANGER, TIME);
      return null;
    } finally {
      setLoading(false);
    }
  }, [getData, setLoading, showAlert]);

  return {
    listAlunos,
    errorGetAlunos,
  };
};

export default useListAlunos;
