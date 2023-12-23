import { IRoute } from './routeType';
import { Navigate } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutCar } from 'pages/AboutCar';
import { AboutTechInspection } from 'pages/AboutTechInspections';
import { AboutComplaint } from 'pages/AboutComplaint';

export const privateRoutes: IRoute[] = [
  { path: '/', element: <MainPage /> },
  { path: '/cars/:id', element: <AboutCar /> },
  { path: 'inspections/:id', element: <AboutTechInspection /> },
  { path: 'complaints/:id', element: <AboutComplaint /> },
  { path: '*', element: <Navigate to="/" replace={true} /> },
];
