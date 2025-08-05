import type { ReactNode } from 'react';
import { ALUNO_SHOW, CIDADE_SHOW, USUARIO_SHOW } from '../../service/constant/Constantes';
import { AiFillSecurityScan, AiFillDashboard } from 'react-icons/ai';
import { FaUser, FaBuilding } from 'react-icons/fa6';
import { ROTA } from '../../service/constant/Url';

export type MenuItem = {
  page: string;
  icon?: ReactNode;
  path?: string;
  sub_menu?: MenuItem[];
};

export const SideBarData: MenuItem[] = [
  {
    page: 'Página Principal',
    icon: <AiFillDashboard size={20} />,
    path: '/dashboard',
  },
  {
    page: 'Cadastros',
    icon: <AiFillSecurityScan size={20} />,
    sub_menu: [
      {
        page: USUARIO_SHOW,
        icon: <FaUser size={20} />,
        path: ROTA.USUARIO.LISTAR,
      },
      {
        page: CIDADE_SHOW,
        icon: <FaBuilding size={20} />,
        path: ROTA.CIDADE.LISTAR,
      },
      {
        page: CIDADE_SHOW,
        icon: <FaBuilding size={20} />,
        path: ROTA.PROFESSOR.LISTAR,
      },
      {
        page: ALUNO_SHOW,
        icon: <FaBuilding size={20} />,
        path: ROTA.ALUNO.LISTAR,
      },
    ],
  },
];
