import { Module } from '@nestjs/common';

import { UsuarioModule } from '../usuario/usuario.module';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadeModule } from 'src/cidade/cidade.module';
import { ProfessorModule } from 'src/professor/professor.module';
import { AlunoModule } from 'src/aluno/aluno.module';
import { AuthModule } from 'src/auth/auth.module';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const oracledb = require('oracledb') as typeof import('oracledb');

oracledb.initOracleClient({
  libDir: 'D:/arquivos/nds/aulas_javascript/oracle/instantclient',
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(1521),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_AUTOLOADENTITIES: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
        DATABASE_LOGGING: Joi.number().required().default(true),
        DATABASE_ROW_NUMBER: Joi.boolean().default(true),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        sid: configService.get('DATABASE_DATABASE'),
        password: configService.get('DATABASE_PASSWORD'),
        //autoLoadEntities: configService.get('DATABASE_AUTOLOADENTITIES'),
        //autoLoadEntities: true,
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
        //logging: configService.get('DATABASE_LOGGING'),
        logging: ['query', 'error'],
        extra: {
          oracleEnableRowNumber: configService.get<boolean>('DATABASE_ROW_NUMBER')!,
        },
        //entities: [Usuario],
      }),
    }),
    UsuarioModule,
    CidadeModule,
    ProfessorModule,
    AlunoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
