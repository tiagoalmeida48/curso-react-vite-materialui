import { Navigate, Route, Routes } from 'react-router';
import { useDrawerContext } from '@/shared/contexts';
import { useEffect } from 'react';
import { Dashboard, UserList } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: 'Página Inicial', icon: 'home', path: '/pagina-inicial' },
      { label: 'Usuários', icon: 'people', path: '/usuarios' }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/usuarios" element={<UserList />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
