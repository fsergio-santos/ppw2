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

import { useValidarDadosReset } from '../../rules/ResetValidationRules';
import { ROTA_AUT } from '../../service/constant/Url';
import './reset.css';

const ResetPassword = () => {
  const { model, setModel, errors, handleChangeField, handleBlurField, validarFormulario, setServerErrors } =
    useValidarDadosReset();
  return (
    <Fragment>
      <Box maxWidth="850px">
        <h1>Alterar Senha</h1>
        <form>
          <div className="p-2">
            <Input
              id="senha"
              label="Senha:"
              Icon={MdIcons.MdEnhancedEncryption}
              type="password"
              value={model.senha}
              handleChange={(e) => handleChangeField('senha', e.target.value)}
              handleBlur={() => handleBlurField('senha')}
              error={errors.senha}
              errorMensagem={errors.senhaMensagem}
            />
          </div>
          <div className="p-2">
            <Input
              id="confirmSenha"
              label="Confirme a Senha:"
              Icon={MdIcons.MdEnhancedEncryption}
              type="password"
              value={model.confirmSenha}
              handleChange={(e) => handleChangeField('confirmSenha', e.target.value)}
              handleBlur={() => handleBlurField('confirmSenha')}
              error={errors.confirmSenha}
              errorMensagem={errors.confirmSenhaMensagem}
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

export default ResetPassword;
