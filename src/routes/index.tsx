import { useDrawerContext } from '@/shared/contexts';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { CityDetail, CityList, Dashboard, UserDetail, UserList } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: 'Página Inicial', icon: 'home', path: '/pagina-inicial' },
      { label: 'Usuários', icon: 'people', path: '/usuarios' },
      { label: 'Cidades', icon: 'location_city', path: '/cidades' }
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/usuarios" element={<UserList />} />
      <Route path="/usuarios/detalhe/:id" element={<UserDetail />} />
      <Route path="/cidades" element={<CityList />} />
      <Route path="/cidades/detalhe/:id" element={<CityDetail />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
