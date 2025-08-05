import { type ReactNode } from 'react';

type HeaderItem = {
  nome: string;
  field: string;
  sort: boolean;
  print: boolean;
  formatter?: (value: any, row?: any) => ReactNode;
};

type TableHeaderProps = {
  headers: HeaderItem[];
  handleSort: (field: string) => void;
  getSortIcon: (field: string) => string;
};

const TableHeader = ({ headers, handleSort, getSortIcon }: TableHeaderProps) => {
  return (
    <thead className="cf">
      <tr>
        {headers.map(
          (header) =>
            header.print !== false && (
              <th
                key={header.field}
                onClick={() => header.sort && handleSort(header.field)}
                className="app-cabecalho-tabela p-3 mb-2 background-success text-white "
              >
                {header.nome} {header.sort ? getSortIcon(header.field) : ''}
              </th>
            ),
        )}
        <th className="app-cabecalho-tabela p-3 mb-2 background-success text-white " colSpan={3}>
          Ações
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
