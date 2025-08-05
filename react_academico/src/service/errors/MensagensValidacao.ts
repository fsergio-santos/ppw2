export const MENSAGEMS_VALIDACAO = {
  ID: {
    blank: 'O código de identificacao deve ser informado',
    length: 'O código informado deve ter 6 caracteres',
  },
  NOME_USUARIO: {
    blank: ' O nome deve ser informado ',
    length: 'O nome deve ter pelo menos 6 caracteres ',
  },
  EMAIL: {
    valid: 'Informe um endereço de e-mail válido',
    null: 'O e-mail não pode ser vázio',
    blank: ' O e-mail deve ser informado ',
  },
  SENHA: {
    valid: 'Informe uma senha válida ',
    null: 'A senha não pode ser nula',
    blank: 'A senha deve ser informada',
    length: 'A senha deve conter 6 caracters ',
  },
  CONFIRM_SENHA: {
    valid: 'Informe uma senha válida',
    equals: 'As senhas deve ser iguais ',
  },
  CODIGO_USUARIO: {
    valid: 'Informe um código válido para o usuário',
  },
  TIPO: {
    valid: 'Informe o tipo de usuário válido para o sistema:  1 - Aluno,  2 - Professor',
  },
  CODIGO_ALUNO: {
    valid: 'Informe um código válido para o aluno',
  },
  NOME_ALUNO: {
    valid: 'O nome do aluno deve ser informado ',
    blank: 'O nome do aluno não está digitado ',
    length: 'O nome do aluno deve conter pelo menos seis caracteres ',
  },
  IDADE: {
    valid: 'Informe uma idade válida para o aluno',
  },
  CODIGO_PROFESSOR: {
    valid: 'Informe um código válido para o professor ',
  },
  NOME_PROFESSOR: {
    valid: 'O nome do professor deve ser informado ',
    blank: 'O nome do professor não está digitado ',
    length: 'O nome do professor deve conter pelo menos seis caracteres ',
  },
  CODIGO_CIDADE: {
    valid: 'Informe um código válido para a cidade  ',
  },
  NOME_CIDADE: {
    valid: 'O nome da cidade deve ser informado ',
    blank: 'O nome da cidade não está digitado ',
    length: 'O nome da cidade deve conter pelo menos seis caracteres ',
  },
};
