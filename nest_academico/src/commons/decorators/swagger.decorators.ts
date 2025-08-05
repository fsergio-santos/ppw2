import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiRespostaPadrao(tipo: Type<unknown>, isArray = false, descricao = '', status = 200): MethodDecorator {
  return applyDecorators(
    ApiResponse({
      status,
      description: descricao,
      schema: {
        allOf: [
          { $ref: '#/components/schemas/Mensagem' },
          {
            properties: {
              dados: isArray
                ? { type: 'array', items: { $ref: `#/components/schemas/${tipo.name}` } }
                : { $ref: `#/components/schemas/${tipo.name}` },
            },
          },
        ],
      },
    }),
  );
}
