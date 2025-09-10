import { HttpStatus, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiResponseOptions, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AlunoResponse } from './aluno/dto/response/aluno.response';
import { AppModule } from './app/app.module';
import { CidadeResponse } from './cidade/dto/response/cidade.response';
import { MENSAGENS_GENERICAS } from './commons/enum/mensagem.generica.enum';
import { ShowExceptionsFilter } from './commons/exceptions/exception.academico';
import { UnprocessebleEntityExceptionFilter } from './commons/exceptions/filters/unprocesseable.entity.filter';
import { Mensagem } from './commons/response/mensagem';
import { ProfessorResponse } from './professor/dto/response/professor.response';
import { UsuarioResponse } from './usuario/dto/response/usuario.response';

const globalResponse: ApiResponseOptions[] = [
  {
    status: HttpStatus.BAD_REQUEST,
    description: MENSAGENS_GENERICAS.DADOS_INVALIDOS,
  },
  {
    status: HttpStatus.UNAUTHORIZED,
    description: MENSAGENS_GENERICAS.SEM_AUTORIZACAO,
  },
  {
    status: HttpStatus.FORBIDDEN,
    description: MENSAGENS_GENERICAS.ACESSO_PROIBIDO,
  },
  {
    status: HttpStatus.NOT_FOUND,
    description: MENSAGENS_GENERICAS.NAO_ENCONTRADO,
  },
  {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: MENSAGENS_GENERICAS.DADOS_INVALIDOS,
  },
  {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: MENSAGENS_GENERICAS.ERRO_INTERNO_DO_SERVIDOR,
  },
];

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalFilters(
    new ShowExceptionsFilter(), // Trata exceções genéricas e personalizadas
    new UnprocessebleEntityExceptionFilter(), // Captura erros 422 de validação e retorna mensagens por campo
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não existem no DTO
      transform: true, // Transforma os dados automaticamente para os tipos definidos nos DTOs
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Define 422 como o status padrão para erros de validação
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  const configSwagger = new DocumentBuilder()
    .setTitle('Sistema Acadêmico ')
    .setDescription('API para gestão acadêmica.')
    .addBearerAuth()
    .setVersion('1.0')
    .addGlobalResponse(...globalResponse)
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger, {
    extraModels: [Mensagem, UsuarioResponse, ProfessorResponse, CidadeResponse, AlunoResponse],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 5000);
}

bootstrap().catch((err) => {
  console.error('Erro crítico ao iniciar a aplicação:', err);
  process.exit(1);
});
