import { useState } from 'react';
import { useAlert } from '../../../context/AlertContexto';
import type { MensagemServidor } from '../../../type/MensagemServidor';
import type { Profile } from '../../../type/Profile';
import { DANGER, SUCCESS, TIME } from '../../constant/Constantes';
import { ROTA_AUT } from '../../constant/Url';
import { getMessageByStatus } from '../../errors/StatusMensagens';
import { useApiResponseHandler } from '../../hook/ApiResponseHandler';
import { useApiAuth } from '../ApiConnection';
import MESSAGES from '../../errors/Mensagens';

type UseGetProfileProps = {
  getUserProfile: () => Promise<MensagemServidor<Profile> | null>;
  errorGetProfile: any | any[] | null;
};

const useGetProfile = (): UseGetProfileProps => {
  const { setLoading, showAlert } = useAlert();
  const [errorGetProfile, setErrorGetProfile] = useState<any | any[] | null>(null);
  const { tratarErrosApi } = useApiResponseHandler();
  const { getProfile } = useApiAuth<Profile>();

  const getUserProfile = async (): Promise<MensagemServidor<Profile> | null> => {
    setLoading(true);
    try {
      const response = await getProfile(ROTA_AUT.PROFILE);
      const { mensagem, status } = response.data;
      setErrorGetProfile(null);
      const msg = mensagem || getMessageByStatus(status);
      showAlert(msg, SUCCESS, TIME);
      return response.data;
    } catch (error: any) {
     const { mensagem = MESSAGES.HTTP_INTERNAL_SERVER_ERROR, dados } = tratarErrosApi(error);
      setErrorGetProfile(dados);
      showAlert(mensagem, DANGER, TIME);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    getUserProfile,
    errorGetProfile,
  };
};

export default useGetProfile;
