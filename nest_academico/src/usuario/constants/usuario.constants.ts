import { ALUNO } from '../../aluno/constants/aluno.constants';
import { criarMensagensOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'USUARIO';

export const USUARIO = {
  ENTITY: ENTITY_NAME,

  TABLE: 'USUARIO',

  TABLE_FIELD: {
    ID_USUARIO: 'ID_USUARIO',
    COD_USUARIO: 'COD_USUARIO',
    NOME_USUARIO: 'NOME_USUARIO',
    EMAIL: 'EMAIL',
    SENHA: 'SENHA',
    FOTO: 'FOTO',
    TIPO: 'TIPO',
    ATIVO: 'ATIVO',
  },

  ALIAS: 'Usuario',

  FIELDS: {
    ID: 'idUsuario',
    CODIGO: 'codUsuario',
    NOME: 'nomeUsuario',
    EMAIL: 'email',
    SENHA: 'senha',
    CONFIRMSENHA: 'confirmSenha',
    FOTO: 'foto',
    TIPO: 'tipo',
    IDCIDADE: 'idCidade',
    IDALUNO: 'idAluno',
    CODALUNO: 'codAluno',
    NOMEALUNO: 'nomeAluno',
    IDADE: 'idade',
    IDPROFESSOR: 'idProfessor',
    NOMEPROFESSOR: 'nomeProfessor',
    CODPROFESSOR: 'codProfessor',
  },

  TO_ONE: {
    TO_ALUNO: ALUNO.ALIAS,
  },

  SWAGGER: {
    ID: `Código do ${ENTITY_NAME} de identificação única `,
    CODIGO: `Código do ${ENTITY_NAME}`,
    NOME: `Nome do ${ENTITY_NAME}`,
    EMAIL: `E-mail do ${ENTITY_NAME}`,
    SENHA: `Senha do ${ENTITY_NAME}`,
    FOTO: `Foto do ${ENTITY_NAME}`,
    CONFIRM_SENHA: `Senha de confirmação do ${ENTITY_NAME}`,
    CODUSUARIO: `Código do ${ENTITY_NAME}`,
    TIPO: `Tipo do ${ENTITY_NAME}`,
    IDALUNO: `Código do ${ENTITY_NAME}`,
    CODALUNO: `Código do ${ENTITY_NAME}`,
    NOMEALUNO: `Nome do ${ENTITY_NAME}`,
    IDADE: `Idade do ${ENTITY_NAME}`,
    IDPROFESSOR: `Código do ${ENTITY_NAME}`,
    CODPROFESSOR: `Código do ${ENTITY_NAME}`,
    NOMEPROFESSOR: `Nome do ${ENTITY_NAME}`,
    IDCIDADE: `Código da ${ENTITY_NAME}`,
    NOMECIDADE: `Nome da ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ID: {
      VALID: `Informe um código de identificação válido para o ${ENTITY_NAME}`,
    },
    CODUSUARIO: {
      BLANK: `O código do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código válido para o ${ENTITY_NAME}`,
      MAX_LEN: `O código do ${ENTITY_NAME} deve conter no máximo 20 caracteres`,
      MIN_LEN: `O código do ${ENTITY_NAME} deve conter no mínimo 6 caracteres`,
      STRING: `O código do ${ENTITY_NAME} dever ser um texto `,
    },
    NOME: {
      BLANK: `O nome do ${ENTITY_NAME} deve ser informado`,
      VALID: `O nome do ${ENTITY_NAME} não foi informado corretamente`,
      MAX_LEN: `O nome do ${ENTITY_NAME} deve conter no máximo 100 caracteres `,
      MIN_LEN: `O código do ${ENTITY_NAME} deve conter no mínimo 6 caracteres`,
      STRING: `O código do ${ENTITY_NAME} dever ser um texto `,
    },
    EMAIL: {
      BLANK: `O e-mail do ${ENTITY_NAME} deve ser informado`,
      VALID: `O e-mail do ${ENTITY_NAME} não foi informado corretamente`,
      LEN: `O e-mail do ${ENTITY_NAME} deve conter pelo menos 6 caracteres e no máximo 100`,
    },
    SENHA: {
      BLANK: `O senha do ${ENTITY_NAME} deve ser informado`,
      VALID: `O senha do ${ENTITY_NAME} não foi informado corretamente`,
      MAX_LEN: `O senha do ${ENTITY_NAME} deve conter no máximo 20 caracteres `,
      MIN_LEN: `O senha do ${ENTITY_NAME} deve conter pelo menos 6 caracteres `,
    },
    CONFIRMSENHA: {
      BLANK: `O senha do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe uma senha válida para ${ENTITY_NAME}`,
      EQUALS: `As senhas deve ser iguais `,
    },
    FOTO: {
      STRING: `O código do ${ENTITY_NAME} dever ser um texto `,
    },
    TIPO: {
      BLANK: `O tipo do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe o tipo de ${ENTITY_NAME} válido para o sistema:  1 - Aluno,  2 - Professor`,
    },
    IDALUNO: {
      VALID: `Informe um código válido para o aluno`,
    },
    CODALUNO: {
      BLANK: `O código do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código válido para o ${ENTITY_NAME}`,
      MAX_LEN: `O código do ${ENTITY_NAME} deve conter no máximo 20 caracteres`,
      MIN_LEN: `O código do ${ENTITY_NAME} deve conter no mínimo 6 caracteres`,
      STRING: `O código do ${ENTITY_NAME} dever ser um texto `,
    },
    NOMEALUNO: {
      VALID: `O nome do aluno deve ser informado `,
      BLANK: `O nome do aluno não foi informado`,
      MAX_LEN: `O nome do aluno deve conter no máximo 100 caracteres `,
      MIN_LEN: `O nome do aluno deve conter no mínimo 6 caracteres`,
      STRING: `O nome do aluno dever ser um texto `,
    },
    IDADE: {
      VALID: `Informe uma idade válida para o aluno`,
    },
    IDPROFESSOR: {
      VALID: `Informe um código válido para o aluno`,
    },
    CODPROFESSOR: {
      BLANK: `O código do professor deve ser informado`,
      VALID: `Informe um código do professor válido `,
      MAX_LEN: `O código do professor deve conter no máximo 20 caracteres`,
      MIN_LEN: `O código do professor deve conter no mínimo 6 caracteres`,
      STRING: `O código do professor dever ser um texto `,
    },
    NOMEPROFESSOR: {
      VALID: `O nome do professor deve ser informado `,
      BLANK: `O nome do professor não foi informado `,
      MAX_LEN: `O nome do professor deve conter no máximo 100 caracteres `,
      MIN_LEN: `O nome do professor deve conter no mínimo 6 caracteres`,
      STRING: `O nome do profesor dever ser um texto `,
    },
    IDCIDADE: {
      VALID: `Informe um código válido para a cidade  `,
    },
    NOMECIDADE: {
      VALID: `O nome da cidade deve ser informado `,
      BLANK: `O nome da cidade não foi informado `,
      MAX_LEN: `O nome da cidade deve conter no máximo 100 caracteres `,
      MIN_LEN: `O nome do cidade deve conter no mínimo 6 caracteres`,
      STRING: `O nome da cidade dever ser um texto `,
    },
  },

  OPERACAO: criarMensagensOperacao(ENTITY_NAME),
};

export const fieldsUsuario = Object.values(USUARIO.FIELDS);
