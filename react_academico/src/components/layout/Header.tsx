import { Fragment, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import {
  BUTTON_SIZE_SHOW_MESSAGE,
  DEFAULT_IMAGEM_THUMBNAIL,
  SERVIDOR_POST_IMAGEM_THUMBNAIL,
} from "../../service/constant/Constantes";

type HeaderProps = {
  toggleMenu: () => void;
};

const Header = ({ toggleMenu }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [foto, setFoto] = useState<null>(null); // Considere tipar 'foto' com string ou null, caso ela venha do servidor

  const navigate = useNavigate();

  const sair = () => {
    // Implemente a lógica para sair da sessão aqui
    console.log("Usuário saiu.");
    // Exemplo: Limpar token, redirecionar para tela de login
  };

  return (
     <Fragment>
      <header className="app-header">
        {/* Contêiner principal para aplicar space-between entre o grupo esquerdo e o perfil */}
        <div className="main-header-container">
          {/* Contêiner flex para agrupar a área esquerda (logo) e o botão de toggle */}
          <div className="left-group-container">
            <div className="app-leftarea">
              <h4>
                SISTEMA<span>IFSP</span>
              </h4>
            </div>
            <div className="app-toggle">
              <i id="sidebar_toggle">
                <FaIcons.FaBars onClick={toggleMenu} />
              </i>
            </div>
          </div>
          {/* Seção do perfil do usuário */}
          <div className="app-profile">
            <div
              className="profile-container"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <img
                src={
                  foto === null
                    ? DEFAULT_IMAGEM_THUMBNAIL
                    : `${SERVIDOR_POST_IMAGEM_THUMBNAIL}${foto}`
                }
                alt="foto de perfil"
              />
              <span>Sérgio</span>
            </div>
            {dropdownOpen && (
              <div className={`dropdown-menu ${dropdownOpen ? "active" : ""}`}>
                <ul>
                  <li onClick={() => navigate("/atualizar-cadastro")}>
                    <i>
                      <FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />
                    </i>
                    Atualizar Cadastro
                  </li>
                  <li onClick={() => navigate("/alterar-senha")}>
                    <i>
                      <RiIcons.RiLockPasswordFill
                        size={BUTTON_SIZE_SHOW_MESSAGE}
                      />
                    </i>
                    Alterar Senha
                  </li>
                  <li onClick={sair}>
                    <i>
                      <FaIcons.FaSignOutAlt size={BUTTON_SIZE_SHOW_MESSAGE} />
                    </i>
                    Sair
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
