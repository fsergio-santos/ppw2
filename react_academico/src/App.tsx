import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AlertProvider from './context/AlertContexto';
import { AuthContextProvider } from './context/AuthContext';
import { routes } from './service/routes/Routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <AlertProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </AlertProvider>
  );
}

export default App;
