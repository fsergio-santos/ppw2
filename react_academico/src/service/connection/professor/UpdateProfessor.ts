import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Professor } from '../../../type/Professor';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseUpdateProfessorProps = {
  updateProfessor: (id: string, dados: Professor) => Promise<MensagemServidor<Professor> | undefined>;
  errorUpdateProfessor: any | any[] | null;
};

const useUpdateProfessor = (): UseUpdateProfessorProps => {
  const { putData } = useApi<Professor>();
  const { setLoading, showAlert } = useAlert();
  const [errorUpdateProfessor, setErrorUpdateProfessor] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const updateProfessor = async (
    id: string | number,
    dados: Professor,
  ): Promise<MensagemServidor<Professor> | undefined> => {
    setLoading(true);
    try {
      const response = await putData(id, ROTA.PROFESSOR.ATUALIZAR, dados);
      const { mensagem, status } = response.data;
      setErrorUpdateProfessor(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorUpdateProfessor(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    updateProfessor,
    errorUpdateProfessor,
  };
};

export default useUpdateProfessor;
