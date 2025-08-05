// routes.tsx
import type { RouteObject } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Dashboard from '../../views/Dashboard';

import UsuarioAlterar from '../../views/usuario/Alterar';
import UsuarioConsultar from '../../views/usuario/Consultar';
import UsuarioExcluir from '../../views/usuario/Excluir';
import UsuarioInserir from '../../views/usuario/Inserir';
import UsuarioListar from '../../views/usuario/Lista';

import ProfessorAlterar from '../../views/professor/Alterar';
import ProfessorConsultar from '../../views/professor/Consultar';
import ProfessorExcluir from '../../views/professor/Excluir';
import ProfessorInserir from '../../views/professor/Inserir';
import ProfessorListar from '../../views/professor/Lista';

import AlunoAlterar from '../../views/aluno/Alterar';
import AlunoConsultar from '../../views/aluno/Consultar';
import AlunoExcluir from '../../views/aluno/Excluir';
import AlunoCriar from '../../views/aluno/Inserir';
import AlunoListar from '../../views/aluno/Lista';

import CidadeAlterar from '../../views/cidade/Alterar';
import CidadeConsultar from '../../views/cidade/Consultar';
import CidadeExcluir from '../../views/cidade/Excluir';
import CidadeInserir from '../../views/cidade/Inserir';
import CidadeListar from '../../views/cidade/Lista';

import Auth from '../../components/layout/Auth';
import Register from '../../views/register/Register';
import ResetPassword from '../../views/reset/Reset';

import Forgot from '../../views/forgot/Forgot';
import Login from '../../views/login/Login';
import { ROTA, ROTA_AUT, ROTA_SISTEMA, URL_DASHBOARD } from '../constant/Url';

export const routes: RouteObject[] = [
  {
    path: `/${ROTA_SISTEMA}`,
    element: <Layout />,
    children: [
      {
        path: URL_DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROTA.USUARIO.LISTAR,
        element: <UsuarioListar />,
      },
      {
        path: ROTA.USUARIO.CRIAR,
        element: <UsuarioInserir />,
      },
      {
        path: `${ROTA.USUARIO.ATUALIZAR}:id`,
        element: <UsuarioAlterar />,
      },
      {
        path: `${ROTA.USUARIO.EXCLUIR}:id`,
        element: <UsuarioExcluir />,
      },
      {
        path: `${ROTA.USUARIO.POR_ID}:id`,
        element: <UsuarioConsultar />,
      },
      {
        path: ROTA.PROFESSOR.LISTAR,
        element: <ProfessorListar />,
      },
      {
        path: ROTA.PROFESSOR.CRIAR,
        element: <ProfessorInserir />,
      },
      {
        path: ROTA.PROFESSOR.ATUALIZAR,
        element: <ProfessorAlterar />,
      },
      {
        path: `${ROTA.PROFESSOR.POR_ID}:id`,
        element: <ProfessorConsultar />,
      },
      {
        path: `${ROTA.PROFESSOR.EXCLUIR}:id`,
        element: <ProfessorExcluir />,
      },
      {
        path: ROTA.ALUNO.LISTAR,
        element: <AlunoListar />,
      },
      {
        path: ROTA.ALUNO.CRIAR,
        element: <AlunoCriar />,
      },
      {
        path: ROTA.ALUNO.ATUALIZAR,
        element: <AlunoAlterar />,
      },
      {
        path: `${ROTA.ALUNO.POR_ID}:id`,
        element: <AlunoConsultar />,
      },
      {
        path: `${ROTA.ALUNO.EXCLUIR}:id`,
        element: <AlunoExcluir />,
      },
      {
        path: ROTA.CIDADE.LISTAR,
        element: <CidadeListar />,
      },
      {
        path: ROTA.CIDADE.CRIAR,
        element: <CidadeInserir />,
      },
      {
        path: ROTA.CIDADE.ATUALIZAR,
        element: <CidadeAlterar />,
      },
      {
        path: `${ROTA.CIDADE.POR_ID}:id`,
        element: <CidadeConsultar />,
      },
      {
        path: `${ROTA.CIDADE.EXCLUIR}:id`,
        element: <CidadeExcluir />,
      },
    ],
  },
  {
    path: ROTA_AUT.BASE,
    element: <Auth />,
    children: [
      {
        path: ROTA_AUT.LOGIN,
        element: <Login />,
      },
      {
        path: ROTA_AUT.REGISTRAR,
        element: <Register />,
      },
      {
        path: ROTA_AUT.RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: ROTA_AUT.FORGOT_PASSWORD,
        element: <Forgot />,
      },
    ],
  },
];
