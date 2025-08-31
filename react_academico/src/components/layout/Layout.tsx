import { Fragment, useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { ROTA_AUT } from '../../service/constant/Url';
import Header from './Header';
import './layout.css'; // Importa o CSS de layout
import SideBar from './SideBar';

const Layout = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate(ROTA_AUT.LOGIN);
  }

  const toggleMenu = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setToggle(false); // Em mobile, o sidebar começa fechado
    } else {
      setToggle(true); // Em desktop, o sidebar começa aberto
    }
  }, [isMobile]);

  return (
    <Fragment>
      <Header toggleMenu={toggleMenu} />
      {/* Novo contêiner para Sidebar e Conteúdo Principal */}
      <div className="page-wrapper">
        <SideBar sidebar={toggle} /> {/* Passa o estado 'toggle' para o SideBar */}
        {/* A classe 'app-content-active' significa que o sidebar está recolhido,
            então o conteúdo principal se expande. */}
        <main className={toggle ? 'app-content active' : 'app-content'}>
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
};

export default Layout;
