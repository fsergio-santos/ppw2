import { HttpStatus, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AlunoResponse } from './aluno/dto/response/aluno.response';
import { AppModule } from './app/app.module';
import { CidadeResponse } from './cidade/dto/response/cidade.response';
import { ShowExceptionsFilter } from './commons/exceptions/exception.academico';
import { UnprocessebleEntityExceptionFilter } from './commons/exceptions/filters/unprocesseable.entity.filter';
import { Mensagem } from './commons/response/mensagem';
import { ProfessorResponse } from './professor/dto/response/professor.response';
import { UsuarioResponse } from './usuario/dto/response/usuario.response';

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
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger, {
    extraModels: [Mensagem, UsuarioResponse, ProfessorResponse, CidadeResponse, AlunoResponse],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap().catch((err) => {
  console.error('Erro crítico ao iniciar a aplicação:', err);
  process.exit(1);
});
