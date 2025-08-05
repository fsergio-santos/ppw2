export const HttpMetodoEnums = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
} as const;

export type MetodoType = typeof HttpMetodoEnums[keyof typeof HttpMetodoEnums];