import { ErrorPage, Sidebar } from '@/shared/components';
import { RoutesPage } from '@/shared/environment';
import { useDrawerStore } from '@/shared/hooks';
import { LinearProgress } from '@mui/material';
import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard').then((m) => ({ default: m.Dashboard })));
const UserList = lazy(() => import('../pages/users/userList/UserList').then((m) => ({ default: m.UserList })));
const UserDetail = lazy(() => import('../pages/users/userDetail/UserDetail').then((m) => ({ default: m.UserDetail })));
const CityList = lazy(() => import('../pages/cities/cityList/CityList').then((m) => ({ default: m.CityList })));
const CityDetail = lazy(() => import('../pages/cities/cityDetails/CityDetail').then((m) => ({ default: m.CityDetail })));

const RootLayout = () => {
  const setDrawerOptions = useDrawerStore((state) => state.setDrawerOptions);

  useEffect(() => {
    setDrawerOptions([
      { label: 'Página Inicial', icon: 'home', path: RoutesPage.DASHBOARD },
      { label: 'Usuários', icon: 'people', path: RoutesPage.USERS },
      { label: 'Cidades', icon: 'location_city', path: RoutesPage.CITIES }
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
        path: RoutesPage.DASHBOARD,
        element: <Dashboard />
      },
      {
        path: RoutesPage.USERS,
        element: <UserList />
      },
      {
        path: `${RoutesPage.USERS_DETAIL}/:id`,
        element: <UserDetail />
      },
      {
        path: RoutesPage.CITIES,
        element: <CityList />
      },
      {
        path: `${RoutesPage.CITIES_DETAIL}/:id`,
        element: <CityDetail />
      },
      {
        path: '*',
        element: <Navigate to={RoutesPage.DASHBOARD} />
      }
    ]
  }
]);
