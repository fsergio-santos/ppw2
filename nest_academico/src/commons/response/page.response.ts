import { PAGINATION } from '../../usuario/enum/paginacao.enum';
export class Pageable {
  readonly page: number;
  readonly pageSize: number;
  readonly field: string;
  readonly order: 'ASC' | 'DESC';

  constructor(
    page: number,
    pageSize: number,
    field?: string,
    order?: string,
    fieldsEntity: string[] = [],
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.field = field ?? fieldsEntity[0];
    this.order = order?.toUpperCase() === PAGINATION.DESC ? PAGINATION.DESC : PAGINATION.ASC;
  }

  get offSet(): number {
    return (this.page - 1) * this.pageSize;
  }
}
