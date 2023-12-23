import { IRoute } from 'app/AppAuthRouter/routeType';
import { CreateTechInspectionPage } from 'pages/CreateTechInspectionPage';
import { CreateComplaintPage } from 'pages/CreateComplaintPage';

export const ServiceOrganisationRoutes: IRoute[] = [
  { path: '/inspections/add', element: <CreateTechInspectionPage /> },
  { path: '/complaints/add', element: <CreateComplaintPage /> },
];
