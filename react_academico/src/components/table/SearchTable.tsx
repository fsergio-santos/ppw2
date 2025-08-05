import { useEffect, useMemo, useRef, useState } from 'react';

import './tabela.css';
interface ItemSelecionado {
  [key: string]: any;
}

interface SearchTableProps<T extends ItemSelecionado> {
  onClose: () => void;
  onSelect: (item: T) => void;
  title: string;
  data: T[] | null;
  columns: { key: keyof T; label: string }[];
  primaryKey: keyof T;
}

const ITEMS_PER_PAGE = 5;

const SearchTable = <T extends ItemSelecionado>({
  onClose,
  onSelect,
  title,
  data,
  columns,
  primaryKey,
}: SearchTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<HTMLDivElement>(null);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return (data ?? []).filter((item) =>
      columns.some((col) => String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [data, searchTerm, columns]);

  const totalPages = Math.ceil((filteredData ?? []).length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return (filteredData ?? []).slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div ref={tableRef}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{title}</h2>
        <button onClick={onClose} title="Fechar" className="btn-close">
          &times;
        </button>
      </div>

      <div className="records">
        <label htmlFor="search-input">Pesquisar:</label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-search"
        />
      </div>

      {paginatedData.length === 0 ? (
        <p>Nenhum item encontrado.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={String(col.key)} className="app-cabecalho-tabela p-3 mb-2 background-success text-white">
                    {col.label}
                  </th>
                ))}
                <th className="app-cabecalho-tabela p-3 mb-2 background-success text-white">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={String(item[primaryKey])}>
                  {columns.map((col) => (
                    <td key={`${String(item[primaryKey])}-${String(col.key)}`} className="app-coluna-detalhe-centro">
                      {String(item[col.key])}
                    </td>
                  ))}
                  <td className="app-coluna-detalhe-centro">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(item);
                        onClose();
                      }}
                      className="btn btn-search btn-md"
                    >
                      Selecionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="container_pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="btn btn-info btn-md"
          >
            Anterior
          </button>
          <span className="app-label-pagination">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-info btn-md"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchTable;
