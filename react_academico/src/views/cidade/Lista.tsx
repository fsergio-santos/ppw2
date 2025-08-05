import { useEffect, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import Form from '../../components/form/Form';
import Box from '../../components/box/Box';
import { BUTTON_SIZE_SHOW_MESSAGE, CIDADE, CIDADE_SHOW, DASHBOARD } from '../../service/constant/Constantes';
import { URL_DASHBOARD } from '../../service/constant/Url';
import Tabela from '../../components/table/Tabela';
import useListCidades from '../../service/connection/cidade/ListCidades';
import { useAlert } from '../../context/AlertContexto';
import type { Cidade } from '../../type/Cidade';

const headers = [
  { nome: 'id', field: 'idCidade', sort: false, print: false },
  { nome: 'Código', field: 'codCidade', sort: true, print: true },
  { nome: 'Nome', field: 'nomeCidade', sort: true, print: true },
];

const navegacaoCidade = {
  titulo: `Manutenção de ${CIDADE_SHOW}s`,
  descricao: `Listar as ${CIDADE_SHOW}s cadastradas no sistema `,
  iconTitulo: <FaIcons.FaListAlt size={BUTTON_SIZE_SHOW_MESSAGE} />,
  iconReturn: <AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE} />,
  toReturn: DASHBOARD,
  toUrl: URL_DASHBOARD,
};

const ListaPaginadaCliente = () => {
  const { listCidades } = useListCidades();
  const [cidades, setCidades] = useState<Cidade[] | null>(null);

  const { loading } = useAlert();

  useEffect(() => {
    const getCidades = async () => {
      const data = await listCidades();
      if (data) {
        const { dados } = data;
        setCidades(dados);
      }
    };
    getCidades();
  }, [listCidades]);

  return (
    <Form navegacao={navegacaoCidade}>
      <div className="container">
        <Box>
          <Tabela headers={headers} data={cidades} path={CIDADE} loading={loading} />
        </Box>
      </div>
    </Form>
  );
};

export default ListaPaginadaCliente;
