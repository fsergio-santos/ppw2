import { useAlert } from '../../context/AlertContexto';
import { DANGER, HTTP_UNPROCESSABLE_ENTITY, TIME } from '../constant/Constantes';
import { getMessageByStatus, getMessageByType } from '../errors/StatusMensagens';

export const handleApiError = (error: any): void => {
  const response = error?.response;
  const data = response?.data;
  const status = data?.status;
  const mensagem = data?.mensagem;

  const { showAlert } = useAlert();

  if (status === HTTP_UNPROCESSABLE_ENTITY) {
    const msg = mensagem || getMessageByStatus(status);
    showAlert(msg, DANGER, TIME);
  } else if (mensagem || status) {
    const msg = mensagem || getMessageByType(status);
    showAlert(msg, DANGER, TIME);
  } else {
    showAlert(getMessageByType(response?.status), DANGER, TIME);
  }
};
