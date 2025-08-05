import { useEffect, useState, type ReactNode } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Thumbnail from '../../components/table/thumbnails/Thumbnail';
import {
  BUTTON_SIZE_SHOW_MESSAGE,
  DASHBOARD,
  DEFAULT_IMAGEM_THUMBNAIL,
  SERVIDOR_POST_IMAGEM_THUMBNAIL,
  USUARIO,
  USUARIO_SHOW,
} from '../../service/constant/Constantes';
import { ROTA, URL_DASHBOARD } from '../../service/constant/Url';
import Form from '../../components/form/Form';
import Tabela from '../../components/table/Tabela';
import { useAlert } from '../../context/AlertContexto';
import Box from '../../components/box/Box';
import UpdatePassword from '../password/UpdatePassword';
import useListProfessores from '../../service/connection/professor/ListProfessores';
import type { Professor } from '../../type/Professor';

type HeardersItem = {
  nome: string;
  field: string;
  sort: boolean;
  print: boolean;
  formatter?: (value?: any, row?: any) => ReactNode;
};

const headers: HeardersItem[] = [
  { nome: 'id', field: 'idProfessor', sort: false, print: false },
  {
    nome: 'Foto',
    field: 'foto',
    sort: false,
    print: true,
    formatter: (value) => (
      <Thumbnail
        src={value ? `${SERVIDOR_POST_IMAGEM_THUMBNAIL}${value}` : undefined}
        default_image={DEFAULT_IMAGEM_THUMBNAIL}
        alt="Foto do Usuário"
      />
    ),
  },
  { nome: 'Código', field: 'codProfessor', sort: true, print: true },
  {
    nome: 'Nome',
    field: 'nomeProfessor',
    sort: true,
    print: true,
    formatter: (value, row) => (
      <Link to={`${ROTA.ROLE.CRIAR}?idUsuario=${encodeURIComponent(row.idUsuario)}`}>{value}</Link>
    ),
  },
  { nome: 'E-mail', field: 'email', sort: false, print: true },
  {
    nome: 'Ativo',
    field: 'ativo',
    sort: true,
    print: true,
    formatter: (value) => (
      <span className={`badge-table ${value === 1 ? 'background-secondary' : 'background-info '}`}>
        {value === 1 ? 'Ativo' : 'Inativo'}
      </span>
    ),
  },
  { nome: 'Cidade', field: 'nomeCidade', sort: false, print: true },
  {
    nome: 'Alterar Senha',
    field: 'idUsuario',
    sort: false,
    print: true,
    formatter: (value: string = '') => <UpdatePassword value={value} />,
  },
];

const navegacaoProfessor = {
  titulo: `Manutenção de ${USUARIO_SHOW}s`,
  descricao: `Listar os ${USUARIO_SHOW}s cadastrados no sistema `,
  iconTitulo: <FaIcons.FaListAlt size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: DASHBOARD,
  toUrl: URL_DASHBOARD,
};

const ListaPaginadaCliente = () => {
  const { listProfessores } = useListProfessores();
  const [professores, setProfessores] = useState<Professor[] | null>(null);

  const { loading } = useAlert();

  useEffect(() => {
    const getProfessores = async () => {
      const data = await listProfessores();
      if (data) {
        const { dados } = data;
        setProfessores(dados);
      }
    };
    getProfessores();
  }, [listProfessores]);

  return (
    <Form navegacao={navegacaoProfessor}>
      <div className="container">
        <Box>
          <Tabela headers={headers} data={professores} path={USUARIO} loading={loading} />
        </Box>
      </div>
    </Form>
  );
};

export default ListaPaginadaCliente;
