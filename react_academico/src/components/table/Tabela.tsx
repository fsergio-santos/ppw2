import { Fragment, useMemo, useState, type ChangeEvent, type ReactNode } from 'react';
import * as FaIcons from 'react-icons/fa';

import './tabela.css';

import { ARROW_DOWN, ARROW_UP, BUTTON_SIZE, SUCCESS } from '../../service/constant/Constantes';
import { ROTA_SISTEMA } from '../../service/constant/Url';
import LinkButton from '../LinkButton/LinkButton';
import Loading from '../loading/Loading';
import TableBody from './body/TableBody';
import TableHeader from './header/TableHeader';
import Pagination from './pagination/Pagination';
import PaginationInfo from './pagination/PaginationInfo';
import SearchBar from './searchBar/SearchBar';

type HeaderItem = {
  nome: string;
  field: string;
  sort: boolean;
  print: boolean;
  formatter?: (value: any, row?: any) => ReactNode;
};

type Indexable = {
  [key: string]: any;
};

type TabelaProps<T> = {
  headers: HeaderItem[];
  data?: T[] | null;
  path: string;
  loading: boolean;
};

type SortAbleItem = {
  [key: string]: any;
};

const Tabela = <T extends Indexable>({ headers, data, path, loading }: TabelaProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string | null;
  }>({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredData: T[] = useMemo(() => {
    return (data ?? []).filter((item: any) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [data, searchTerm]);

  const handleSort = (key: string) => {
    let direction: string | null = null;
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }

    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const key = sortConfig.key;
    return [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = sortedData.slice(startIndex, startIndex + recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRecordsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.key === field) {
      return sortConfig.direction === 'asc' ? ARROW_UP : ARROW_DOWN;
    }
    return '';
  };

  return (
    <Fragment>
      <SearchBar
        searchTerm={searchTerm ?? ''}
        setSearchTerm={setSearchTerm}
        recordsPerPage={recordsPerPage}
        handleRecordsPerPageChange={handleRecordsPerPageChange}
      />
      {loading ? <Loading /> : null}
      <div id="no_more_table">
        <table className="app-tabela table table-striped table-bordered table-hover cf">
          <TableHeader headers={headers} handleSort={handleSort} getSortIcon={getSortIcon} />
          <TableBody headers={headers} currentRecords={currentRecords} path={path} />
        </table>
        <div className="container_pagination">
          <PaginationInfo page={currentPage} pageSize={recordsPerPage} totalElements={filteredData.length} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
        <div className="row mt-4">
          <div className="col-xs-12 col-sm-12 col-md-3 ml-5 ">
            <LinkButton
              to={`/${ROTA_SISTEMA}/${path}/criar`}
              type="button"
              title={`Incluir dados do ${path}`}
              variant={SUCCESS}
              cssClass="app-label app-button"
              label="Incluir"
              icon={<FaIcons.FaPlus size={BUTTON_SIZE} />}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Tabela;
