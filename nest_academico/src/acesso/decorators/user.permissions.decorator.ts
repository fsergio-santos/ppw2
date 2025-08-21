import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';

/**
 * @param permission A string que representa a permissão (ex: 'PEDIDO:CREATE:OWN')
 */
export const RequirePermission = (permission: string) => SetMetadata(PERMISSION_KEY, permission);
