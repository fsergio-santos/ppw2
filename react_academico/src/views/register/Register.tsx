import type { FormEvent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Fragment } from 'react/jsx-runtime';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import LinkButton from '../../components/LinkButton/LinkButton';
import { useAlert } from '../../context/AlertContexto';
import { useValidarDadosRegistro } from '../../rules/RegistroValidationRules';
import useRegistro from '../../service/connection/register/PostRegister';
import {
  BUTTON_SIZE,
  DANGER,
  MESSAGE_CANCEL_FORM,
  MESSAGE_SAVE_FORM,
  SUCCESS,
  TIME,
  USUARIO_SHOW,
  WARNING,
} from '../../service/constant/Constantes';
import { ROTA_AUT } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import './register.css';

const Register = () => {
  const { showAlert } = useAlert();
  const { registro } = useRegistro();
  const { model, setModel, errors, handleChangeField, handleBlurField, validarFormulario, setServerErrors } =
    useValidarDadosRegistro();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validarFormulario()) {
      showAlert(MENSAGEM_SISTEMA.USUARIO.SAVE_FORM, DANGER, TIME);
    } else {
      await registro(model);
    }
  };
  return (
    <Fragment>
      <Box maxWidth="850px">
        <h1>Registre-se</h1>
        <form onSubmit={handleSubmit}>
          <div className="p-2">
            <Input
              id="nomeUsuario"
              label="Nome:"
              Icon={FaIcons.FaUserCircle}
              type="text"
              value={model.nomeUsuario}
              handleChange={(e) => handleChangeField('nomeUsuario', e.target.value)}
              handleBlur={() => handleBlurField('nomeUsuario')}
              error={errors.nomeUsuario}
              errorMensagem={errors.nomeUsuarioMensagem}
            />
          </div>
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

export default Register;
