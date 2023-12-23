import { IRoute } from 'app/AppAuthRouter/routeType';
import { CreateTechInspectionPage } from 'pages/CreateTechInspectionPage';

export const ClientRoutes: IRoute[] = [
  { path: '/inspections/add', element: <CreateTechInspectionPage /> },
];
