export class Page<T> {
  content: T[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  pageSize: number = 0;
  page: number = 0;
  lastPage: number = 0;
  offSet: number = 0;

  private constructor(
    content: T[],
    totalPages: number,
    totalElements: number,
    pageSize: number,
    page: number,
    lastPage: number,
    offSet: number,
  ) {
    this.content = content;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.pageSize = pageSize;
    this.page = page;
    this.lastPage = lastPage;
    this.offSet = offSet;
  }

  static of<T>(content: T[], totalElements: number, pageSize?: number, page?: number): Page<T> {
    const finalPageSize = this.calcularPageSize(totalElements, pageSize);
    const totalPages = this.calcularTotalPages(totalElements, finalPageSize);
    const finalPage = page && page > 0 ? page : 1;
    const lastPage = totalPages;
    const offSet = this.calculateOffset(page, pageSize);

    return new Page<T>(
      content,
      totalPages,
      totalElements,
      finalPageSize,
      finalPage,
      lastPage,
      offSet,
    );
  }

  private static calcularPageSize(totalElements: number, pageSize?: number): number {
    return pageSize && pageSize > 0 ? pageSize : totalElements;
  }

  private static calcularTotalPages(totalElements: number, pageSize: number): number {
    return pageSize > 0 ? Math.ceil(totalElements / pageSize) : 1;
  }

  private static calculateOffset(page?: number, pageSize?: number): number {
    if (!page || !pageSize || page < 1 || pageSize < 1) {
      return 0;
    }
    return page * pageSize;
  }
}
