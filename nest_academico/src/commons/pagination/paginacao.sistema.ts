import { Pageable } from './page.response';

export class Page<T> {
  content: T[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  pageSize: number = 0;
  page: number = 0;
  lastPage: number = 0;

  private constructor(
    content: T[],
    totalPages: number,
    totalElements: number,
    pageSize: number,
    page: number,
    lastPage: number,
  ) {
    this.content = content;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.pageSize = pageSize;
    this.page = page;
    this.lastPage = lastPage;
  }

  static of<T>(content: T[], totalElements: number, pageable: Pageable): Page<T> {
    const pageSize = pageable.pageSize ?? totalElements;
    const totalPages = pageSize > 0 ? Math.ceil(totalElements / pageSize) : 1;
    const lastPage = totalPages;
    const page = pageable.page ?? 1;

    return new Page<T>(content, totalPages, totalElements, pageSize, page, lastPage);
  }
}
