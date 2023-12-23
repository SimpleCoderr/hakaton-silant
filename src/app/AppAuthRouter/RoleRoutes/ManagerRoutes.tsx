import { IRoute } from 'app/AppAuthRouter/routeType';
import { CreateCarPage } from 'pages/CreateCarPage';
import { CreateTechInspectionPage } from 'pages/CreateTechInspectionPage';
import { CreateComplaintPage } from 'pages/CreateComplaintPage';

export const ManagerRoutes: IRoute[] = [
  { path: '/create-car', element: <CreateCarPage /> },
  { path: '/inspections/add', element: <CreateTechInspectionPage /> },
  { path: '/complaints/add', element: <CreateComplaintPage /> },
];
