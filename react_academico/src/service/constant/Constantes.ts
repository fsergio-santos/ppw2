import IMAGEM_THUMBNAIL from '../../assets/img/thumbnail.avatar.png';
import USER from '../../assets/img/user.png';

export const SERVIDOR = 'http://localhost:8080/rest';

export const DEFAULT_IMAGEM = USER;
export const DEFAULT_IMAGEM_THUMBNAIL = IMAGEM_THUMBNAIL;
export const SERVIDOR_POST_IMAGEM = SERVIDOR + '/foto/f/';
export const SERVIDOR_POST_IMAGEM_THUMBNAIL = SERVIDOR + '/foto/f/thumbnail.';

export const BUTTON_SIZE = 30;
export const BUTTON_SIZE_SHOW_MESSAGE = 30;
export const TIME = 5000;

export const PASSWORD_LENGTH = 6;

export const SUCCESS = 'success';
export const DANGER = 'danger';
export const INFO = 'info';
export const WARNING = 'warning';
export const UNDEFINED = 'undefined';

export const PRIMARY = 'primary';
export const SECONDARY = 'secondary';

export const ARROW_UP = '\u25B2'; // ▲
export const ARROW_DOWN = '\u25BC'; // ▼

export const ALUNO_SHOW = 'Aluno';
export const USUARIO_SHOW = 'Usuário';
export const CIDADE_SHOW = 'Cidade';
export const PROFESSOR_SHOW = 'Professor';
export const ROLE_SHOW = 'Roles';
export const LOGIN_SHOW = 'Login';

export const DASHBOARD = 'Dashboard';
export const ALUNO = 'aluno';
export const USUARIO = 'usuario';
export const CIDADE = 'cidade';
export const PROFESSOR = 'professor';
export const ROLE = 'role';
export const LOGIN = 'login';

export const MESSAGE_SAVE_FORM = `Salvar o cadastro `;
export const MESSAGE_CANCEL_FORM = `Cancelar o cadastro `;
export const MESSAGE_DELETE_FORM = `Excluir o cadastro `;
export const MESSAGE_RECOVERY_PASSWORD_FORM = `Recuperar senha`;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_NO_CONTENT = 204;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;
export const HTTP_NOT_ACCEPTABLE = 406;
export const HTTP_PRECONDITION_FAILED = 412;
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_UNPROCESSABLE_ENTITY = 422;
