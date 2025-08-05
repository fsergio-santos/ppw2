import { type ReactNode } from 'react';
import RowActions from '../acttions/RowActions';

type HeaderItem = {
  nome: string;
  field: string;
  sort: boolean;
  print: boolean;
  formatter?: (value: any, row?: any) => ReactNode;
};

type RecordItem = { [key: string]: any };

type TableBodyProps = {
  headers: HeaderItem[];
  currentRecords: RecordItem[];
  path?: string;
};

const TableBody = ({ headers, currentRecords, path }: TableBodyProps) => {
  const idField = headers.find((header) => header.nome.toLowerCase() === 'id')?.field as string;

  return (
    <tbody>
      {currentRecords.length > 0 ? (
        currentRecords.map((row, index) => (
          <tr key={index}>
            {headers.map(
              (header, colIndex) =>
                header.print !== false && (
                  <td key={colIndex} data-label={header.nome} className="app-coluna-detalhe-centro">
                    {header.formatter ? header.formatter(row[header.field], row) : row[header.field]}
                  </td>
                ),
            )}
            <RowActions path={path} id={row[idField]} />
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={headers.length + 1}>Nenhum resultado encontrado</td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
