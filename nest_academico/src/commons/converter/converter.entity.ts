import { plainToInstance } from 'class-transformer';

import { ClassConstructor } from 'class-transformer/types/interfaces';

/**
 * O - CLASSE DE ORIGEM A SER PROCESSADA  
 * D - CLASSE DE DESTINO A SER PROCESSADA
*/

export class ModelMapper {
  static fromRequest<O, D>(dto: O, entityClass: ClassConstructor<D>): D {
    return plainToInstance(entityClass, dto, {
      excludeExtraneousValues: true,
    });
  }

  static toResponse<D, O>(entity: O, dtoClass: ClassConstructor<D>): D {
    return plainToInstance(dtoClass, entity, {
      excludeExtraneousValues: true,
    });
  }

  static toResponseList<D, O>(entities: O[], dtoClass: ClassConstructor<D>): D[] {
    return plainToInstance(dtoClass, entities, {
      excludeExtraneousValues: true,
    });
  }
}
