import { Fragment, type ReactNode } from 'react';
import Navegacao from '../navegacao/Navegacao';

type FormProps = {
  children?: ReactNode;
  navegacao: NavegacaoProps;
};

type NavegacaoProps = {
  titulo: string;
  descricao: string;
  iconTitulo: ReactNode;
  iconReturn: ReactNode;
  toReturn: string;
  toUrl: string;
};

const Form = ({ children, navegacao }: FormProps) => {
  const { titulo, iconTitulo, descricao, iconReturn, toReturn, toUrl } = navegacao;
  return (
    <Fragment>
      {navegacao && (
        <Navegacao
          titulo={titulo}
          iconTitulo={iconTitulo}
          descricao={descricao}
          iconReturn={iconReturn}
          toReturn={toReturn}
          toUrl={toUrl}
        />
      )}
      {children}
    </Fragment>
  );
};

export default Form;
