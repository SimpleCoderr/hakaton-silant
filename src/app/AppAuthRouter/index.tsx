import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from 'app/AppAuthRouter/privateRoutes';
import { publicRoutes } from 'app/AppAuthRouter/publicRoutes';
import { TIRole } from 'shared/interfaces';
import { AdminRoutes } from 'app/AppAuthRouter/RoleRoutes/AdminRoutes';
import { ClientRoutes } from 'app/AppAuthRouter/RoleRoutes/ClientRoutes';
import { ManagerRoutes } from 'app/AppAuthRouter/RoleRoutes/ManagerRoutes';
import { ServiceOrganisationRoutes } from 'app/AppAuthRouter/RoleRoutes/ServiceOrganisationRoutes';

const AppAuthRouter = () => {
  const isLogged = !!localStorage.getItem('accessToken');
  const role: TIRole = localStorage.getItem('role') as TIRole;

  const roleAccessRoutes =
    role === 'ROLE_ADMIN'
      ? AdminRoutes
      : role === 'ROLE_CLIENT'
        ? ClientRoutes
        : role === 'ROLE_MANAGER'
          ? ManagerRoutes
          : ServiceOrganisationRoutes;

  const routesForAuthUser = [...roleAccessRoutes, ...privateRoutes];

  return (
    <Routes>
      {isLogged ? (
        <>
          {routesForAuthUser.map(route => (
            <Route {...route} key={route.path} />
          ))}
        </>
      ) : (
        <>
          {publicRoutes.map(route => (
            <Route {...route} key={route.path} />
          ))}
        </>
      )}
    </Routes>
  );
};

export default AppAuthRouter;
