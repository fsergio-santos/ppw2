import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

import { type FormEvent } from 'react';
import Loading from '../../components/loading/Loading';
import { useAlert } from '../../context/AlertContexto';
import { useAuthContext } from '../../context/AuthContext';
import { useValidarDadosLogin } from '../../rules/LoginValidationRules';
import { BUTTON_SIZE, DANGER, LOGIN_SHOW, SUCCESS, TIME } from '../../service/constant/Constantes';
import { ROTA_AUT, URL_DASHBOARD } from '../../service/constant/Url';
import { MENSAGEM_SISTEMA } from '../../service/errors/MensagemSistema';
import './login.css';

const Login = () => {
  const { model, errors, handleChangeField, handleBlurField, validarFormulario } = useValidarDadosLogin();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthContext();
  const { loading, showAlert } = useAlert();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validarFormulario()) {
      showAlert(MENSAGEM_SISTEMA.LOGIN.DANGER, DANGER, TIME);
    }
    login(model.email, model.senha);
    if (isAuthenticated) {
      navigate(URL_DASHBOARD);
    }
  };

  return (
    <Fragment>
      {loading ? <Loading /> : null}
      <Box maxWidth="850px" marginTop="20px">
        <h1>Login</h1>
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
          <div className="p-2 mb-4">
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

          <Button
            id="buttonSubmit"
            type="button"
            title={`Acesso ${LOGIN_SHOW} ao sistema`}
            variant={SUCCESS}
            cssClass="btn-lg app-button  mt-3"
            label="Acesso"
            icon={<FaIcons.FaLockOpen size={BUTTON_SIZE} />}
          />
          <div className="login-links">
            <Link to={ROTA_AUT.REGISTRAR} className="login-link">
              {MENSAGEM_SISTEMA.LOGIN.CREATE_ACCOUNT}
            </Link>
            <Link to={ROTA_AUT.FORGOT_PASSWORD} className="login-link">
              {MENSAGEM_SISTEMA.LOGIN.RECOVERY_PASSWORD_FORM}
            </Link>
          </div>
        </form>
      </Box>
    </Fragment>
  );
};

export default Login;
