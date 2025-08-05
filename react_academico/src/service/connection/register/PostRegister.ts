import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Registro } from '../../../type/Registro';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApi } from '../ApiConnection';

type UseRegistroProps = {
  registro: (dados: Registro) => Promise<MensagemServidor<Registro> | undefined>;
  errorRegistro: any | any[] | null;
};

const useRegistro = (): UseRegistroProps => {
  const { postData } = useApi<Registro>();
  const { setLoading, showAlert } = useAlert();
  const [errorRegistro, setErrorRegistro] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();

  const registro = async (dados: Registro): Promise<MensagemServidor<Registro> | undefined> => {
    setLoading(true);
    try {
      const response = await postData(ROTA.PROFESSOR.CRIAR, dados);
      const { mensagem, status } = response.data;
      setErrorRegistro(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
      const { mensagem, dados } = tratarErrosApi(error);
      setErrorRegistro(dados);
      showAlert(mensagem, DANGER, TIME);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    registro,
    errorRegistro,
  };
};

export default useRegistro;
