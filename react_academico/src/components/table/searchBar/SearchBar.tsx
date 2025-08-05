import { type ChangeEvent } from 'react';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  recordsPerPage: number;
  handleRecordsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SearchBar = ({ searchTerm, setSearchTerm, recordsPerPage, handleRecordsPerPageChange }: SearchBarProps) => {
  return (
    <div className="select-records">
      <div className="input-search">
        <label className="app-label">Pesquisa:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="select-page">
        <label htmlFor="recordsPerPage" className="app-label">
          Registros por página:
        </label>
        <select
          id="recordsPerPage"
          value={recordsPerPage}
          onChange={(e) => handleRecordsPerPageChange(e)}
          className="form-select"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
