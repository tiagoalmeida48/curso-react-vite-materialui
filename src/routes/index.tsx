import { Sidebar, ErrorPage } from '@/shared/components';
import { useDrawerStore } from '@/shared/hooks';
import { LinearProgress } from '@mui/material';
import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard').then((m) => ({ default: m.Dashboard })));
const UserList = lazy(() => import('../pages/users/UserList').then((m) => ({ default: m.UserList })));
const UserDetail = lazy(() => import('../pages/users/UserDetail').then((m) => ({ default: m.UserDetail })));
const CityList = lazy(() => import('../pages/cities/CityList').then((m) => ({ default: m.CityList })));
const CityDetail = lazy(() => import('../pages/cities/CityDetail').then((m) => ({ default: m.CityDetail })));

const RootLayout = () => {
  const setDrawerOptions = useDrawerStore((state) => state.setDrawerOptions);

  useEffect(() => {
    setDrawerOptions([
      { label: 'Página Inicial', icon: 'home', path: '/pagina-inicial' },
      { label: 'Usuários', icon: 'people', path: '/usuarios' },
      { label: 'Cidades', icon: 'location_city', path: '/cidades' }
    ]);
  }, [setDrawerOptions]);

  return (
    <Sidebar>
      <Suspense fallback={<LinearProgress variant="indeterminate" />}>
        <Outlet />
      </Suspense>
    </Sidebar>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LinearProgress variant="indeterminate" />,
    children: [
      {
        path: '/pagina-inicial',
        element: <Dashboard />
      },
      {
        path: '/usuarios',
        element: <UserList />
      },
      {
        path: '/usuarios/detalhe/:id',
        element: <UserDetail />
      },
      {
        path: '/cidades',
        element: <CityList />
      },
      {
        path: '/cidades/detalhe/:id',
        element: <CityDetail />
      },
      {
        path: '*',
        element: <Navigate to="/pagina-inicial" />
      }
    ]
  }
]);
