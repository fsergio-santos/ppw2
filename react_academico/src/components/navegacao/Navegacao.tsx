import { Link } from 'react-router-dom';
import './navegacao.css';
import { Fragment, type ReactNode } from 'react';

type NavegacaoProps = {
  titulo: string;
  descricao: string;
  iconTitulo: ReactNode;
  iconReturn: ReactNode;
  toReturn: string;
  toUrl: string;
};

function Navegacao({ titulo, iconTitulo, descricao, iconReturn, toReturn, toUrl }: NavegacaoProps) {
  return (
    <Fragment>
      {/* Adicionado um id para facilitar o scroll-to-top se necessário */}
      <div className="app-titulo-sistema border-bottom" id="page-title-area">
        <div className="title-and-description">
          {' '}
          {/* Novo contêiner para título e descrição */}
          <h3>
            {/* Ícone e título lado a lado e alinhados verticalmente */}
            <span className="icon-wrapper">{iconTitulo}</span>
            {titulo}
          </h3>
          <p>{descricao}</p>
        </div>

        <div className="font-navegacao">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={toUrl}>
                <span className="icon-wrapper">{iconReturn}</span> {/* Ícone para o link de retorno */}
                {toReturn}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default Navegacao;
