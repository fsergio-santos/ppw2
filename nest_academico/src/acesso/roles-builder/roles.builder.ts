export enum Action {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  VIEW = 'VIEW',
}

export enum Possession {
  OWN = 'OWN',
  ANY = 'ANY',
}

export interface Grant {
  role: string;
  resource: string;
  action: Action;
  possession: Possession;
}

export enum FunctionRoles {
  CREATEOWN = 'createOwn',
  CREATEANY = 'createAny',
  READOWN = 'readOwn',
  READANY = 'readAny',
  UPDADEOWN = 'updateOwn',
  UPDATEANY = 'updateAny',
  DELETEOWN = 'deleteOwn',
  DELETEANY = 'deleteAny',
  VIEWOWN = 'viewOwn',
  VIEWANY = 'viewAny',
}

export type GrantMethod =
  | 'createOwn'
  | 'createAny'
  | 'readOwn'
  | 'readAny'
  | 'updateOwn'
  | 'updateAny'
  | 'deleteOwn'
  | 'deleteAny'
  | 'viewOwn'
  | 'viewAny';

interface GrantBuilder {
  createOwn(resource: string): RolesBuilder;
  createAny(resource: string): RolesBuilder;
  readOwn(resource: string): RolesBuilder;
  readAny(resource: string): RolesBuilder;
  updateOwn(resource: string): RolesBuilder;
  updateAny(resource: string): RolesBuilder;
  deleteOwn(resource: string): RolesBuilder;
  deleteAny(resource: string): RolesBuilder;
  viewOwn(resource: string): RolesBuilder;
  viewAny(resource: string): RolesBuilder;
}

export class RolesBuilder {
  private grants: Grant[] = [];

  grant(role: string): GrantBuilder {
    return {
      createOwn: (resource: string) => {
        this.grants.push({ role, resource, action: Action.CREATE, possession: Possession.OWN });
        return this;
      },
      createAny: (resource: string) => {
        this.grants.push({ role, resource, action: Action.CREATE, possession: Possession.ANY });
        return this;
      },
      readOwn: (resource: string) => {
        this.grants.push({ role, resource, action: Action.READ, possession: Possession.OWN });
        return this;
      },
      readAny: (resource: string) => {
        this.grants.push({ role, resource, action: Action.READ, possession: Possession.ANY });
        return this;
      },
      updateOwn: (resource: string) => {
        this.grants.push({ role, resource, action: Action.UPDATE, possession: Possession.OWN });
        return this;
      },
      updateAny: (resource: string) => {
        this.grants.push({ role, resource, action: Action.UPDATE, possession: Possession.ANY });
        return this;
      },
      deleteOwn: (resource: string) => {
        this.grants.push({ role, resource, action: Action.DELETE, possession: Possession.OWN });
        return this;
      },
      deleteAny: (resource: string) => {
        this.grants.push({ role, resource, action: Action.DELETE, possession: Possession.ANY });
        return this;
      },
      viewOwn: (resource: string) => {
        this.grants.push({ role, resource, action: Action.VIEW, possession: Possession.ANY });
        return this;
      },
      viewAny: (resource: string) => {
        this.grants.push({ role, resource, action: Action.VIEW, possession: Possession.ANY });
        return this;
      },
    };
  }

  can(role: string, action: Action, possession: Possession, resource: string): boolean {
    return this.grants.some(
      (grant) =>
        grant.role === role &&
        grant.action === action &&
        grant.possession === possession &&
        grant.resource === resource,
    );
  }
}
