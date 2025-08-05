import { Outlet } from 'react-router-dom';

const authStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  minHeight: '100vh',
  background: 'var(--bg-body)',
  padding: '2rem',
};

const Auth = () => {
  return (
    <div style={authStyle}>
      <Outlet />
    </div>
  );
};

export default Auth;
