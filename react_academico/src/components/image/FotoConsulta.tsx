import React from 'react';
import './imagemupload.css';

type FotoConsultaProps = {
  foto: string;
  DEFAULT_IMAGEM: string;
  SERVIDOR_POST_IMAGEM: string;
};

const FotoConsulta = ({ foto, DEFAULT_IMAGEM, SERVIDOR_POST_IMAGEM }: FotoConsultaProps) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="custom-container">
            <img
              src={!foto ? DEFAULT_IMAGEM : `${SERVIDOR_POST_IMAGEM}${foto}`}
              className="avatar-foto"
              alt="Usuário"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FotoConsulta;
