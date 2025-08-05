import React from "react";

type PaginationInfoProps = {
  page: number;
  pageSize: number;
  totalElements: number;
};

const PaginationInfo = ({
  page,
  pageSize,
  totalElements,
}: PaginationInfoProps) => {
  const totalPages = Math.ceil(totalElements / pageSize);

  return (
    <p className="">
      Mostrando&nbsp;&nbsp;
      <span className="badge background-secondary text-center">
        {pageSize * (page - 1) + 1}
      </span>
      &nbsp;até&nbsp;
      <span className="badge background-secondary">
        {Math.min(pageSize * page, totalElements)}
      </span>
      &nbsp;de&nbsp;
      <span className="badge background-secondary">{totalPages}</span>
      &nbsp;Páginas de&nbsp;
      <span className="badge background-secondary">{totalElements}</span>
      &nbsp;Registros Cadastrados.
    </p>
  );
};

export default PaginationInfo;
