import { useEffect, useState, type ReactNode } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Thumbnail from '../../components/table/thumbnails/Thumbnail';
import {
  ALUNO_SHOW,
  BUTTON_SIZE_SHOW_MESSAGE,
  DASHBOARD,
  DEFAULT_IMAGEM_THUMBNAIL,
  SERVIDOR_POST_IMAGEM_THUMBNAIL,
  ALUNO,
} from '../../service/constant/Constantes';
import { ROTA, URL_DASHBOARD } from '../../service/constant/Url';
import Form from '../../components/form/Form';
import Tabela from '../../components/table/Tabela';
import type { Aluno } from '../../type/Aluno';
import { useAlert } from '../../context/AlertContexto';
import useListAlunos from '../../service/connection/aluno/ListAlunos';
import Box from '../../components/box/Box';
import UpdatePassword from '../password/UpdatePassword';

type HeardersItem = {
  nome: string;
  field: string;
  sort: boolean;
  print: boolean;
  formatter?: (value?: any, row?: any) => ReactNode;
};

const headers: HeardersItem[] = [
  { nome: 'id', field: 'idAluno', sort: false, print: false },
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
  { nome: 'Código', field: 'codAluno', sort: true, print: true },
  {
    nome: 'Nome',
    field: 'nomeAluno',
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

const navegacaoAluno = {
  titulo: `Manutenção de ${ALUNO_SHOW}`,
  descricao: `Listar os ${ALUNO_SHOW}s cadastrados no sistema `,
  iconTitulo: <FaIcons.FaListAlt size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: DASHBOARD,
  toUrl: URL_DASHBOARD,
};

const ListaPaginadaCliente = () => {
  const { listAlunos } = useListAlunos();
  const [alunos, setAlunos] = useState<Aluno[] | null>(null);

  const { loading } = useAlert();

  useEffect(() => {
    const getAlunos = async () => {
      const data = await listAlunos();
      if (data) {
        const { dados } = data;
        setAlunos(dados);
      }
    };
    getAlunos();
  }, [listAlunos]);

  return (
    <Form navegacao={navegacaoAluno}>
      <div className="container">
        <Box>
          <Tabela headers={headers} data={alunos} path={ALUNO} loading={loading} />
        </Box>
      </div>
    </Form>
  );
};

export default ListaPaginadaCliente;
