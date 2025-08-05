import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Fragment } from 'react/jsx-runtime';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';

import {
  BUTTON_SIZE,
  MESSAGE_CANCEL_FORM,
  MESSAGE_SAVE_FORM,
  SUCCESS,
  USUARIO_SHOW,
  WARNING,
} from '../../service/constant/Constantes';

import useForgot from '../../service/connection/forgot/PostForgot';
import { ROTA_AUT } from '../../service/constant/Url';
import './forgot.css';

const Forgot = () => {
  const { model, errors, handleChangeField, handleBlurField, handleSubmit } = useForgot();

  return (
    <Fragment>
      <Box maxWidth="850px">
        <h1>Recuperar Senha</h1>
        <form onSubmit={handleSubmit}>
          <div className="p-2">
            <Input
              id="email"
              label="E-mail:"
              Icon={FaIcons.FaAt}
              type="text"
              value={model.email}
              handleChange={(e) => handleChangeField('email', e.target.value)}
              handleBlur={() => handleBlurField('email')}
              error={errors.email}
              errorMensagem={errors.emailMensagem}
            />
          </div>

          <div className="buttons-form-cadastro-cidade">
            <Button
              id="buttonSubmit"
              type="submit"
              title={`Incluir dados da ${USUARIO_SHOW}`}
              variant={SUCCESS}
              cssClass="btn-lg app-button app-label mt-3 mb-3"
              label={MESSAGE_SAVE_FORM}
              icon={<FaIcons.FaSave size={BUTTON_SIZE} />}
            />
            <LinkButton
              to={ROTA_AUT.LOGIN}
              type="button"
              title={`Cancelar a inclusão dos dados da ${USUARIO_SHOW}`}
              variant={WARNING}
              cssClass="btn-lg app-button app-label mt-3 mb-3"
              label={MESSAGE_CANCEL_FORM}
              icon={<MdIcons.MdCancel size={BUTTON_SIZE} />}
            />
          </div>
        </form>
      </Box>
    </Fragment>
  );
};

export default Forgot;
