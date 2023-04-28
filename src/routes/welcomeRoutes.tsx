import { WelcomeLayout } from '../layouts/WelcomeLayout'

export const welcomeRoutes = {
  path: 'welcome',
  element: <WelcomeLayout />,
  children: [
    { path: '1', element: <div>1</div> },
    { path: '2', element: <div>2</div> },
    { path: '3', element: <div>3</div> },
    { path: '4', element: <div>4</div> },
  ],
}
