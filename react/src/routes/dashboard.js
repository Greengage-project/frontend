import AuthGuard from 'components/guards/AuthGuard';
import { lazy } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Loadable from './Loadable';

const CoproductionProcessProfile = Loadable(
  lazy(() => import('../pages/dashboard/coproductionprocesses/CoproductionProcessProfile'))
);

const Catalogue = Loadable(
  lazy(() => import('../pages/dashboard/interlinkers/Catalogue'))
);
const InterlinkerProfile = Loadable(
  lazy(() => import('../components/dashboard/interlinkers/profile/InterlinkerProfile'))
);
const Organizations = Loadable(
  lazy(() => import('../pages/dashboard/organizations/index'))
);
const Workspace = Loadable(lazy(() => import('../pages/dashboard/workspace')));

export const routes = [
  {
    path: 'dashboard',
    element: (
      <DashboardLayout />
    ),
    children: [
      {
        path: '',
        element: <Workspace />,
      },

      {
        path: 'coproductionprocesses/:processId',
        children: [
          {
            path: '',
            element: <AuthGuard><CoproductionProcessProfile /></AuthGuard>
            ,
          },
          {
            path: ':tab',
            element: <AuthGuard><CoproductionProcessProfile /></AuthGuard>
          },
        ]
      },
      {
        path: 'interlinkers',
        children: [
          {
            path: '',
            element: <Catalogue />,
          },
          {
            path: ':interlinkerId',
            element: <InterlinkerProfile />,
          },
        ],
      },
      {
        path: 'organizations',
        children: [
          {
            path: '',
            element: <Organizations />,
          },
        ],
      }
    ],

  },

];
