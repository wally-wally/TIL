import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ContactList from './pages/ContactList/ContactList';
import ContactView from './pages/ContactView/ContactView';
import NotFound from './pages/NotFound/NotFound';

const App: React.FC = () => {
	const routes = [
		{
			index: true,
			element: <Navigate to="/private/all" />
		},
		{
			path: '/:type(private|public)/:id(all|\\d+)',
			element: <ContactList />,
		},
		{
			path: '/view/:id(\\d+)',
			element: <ContactView />,
		},
		{
			path: '*',
			element: <NotFound />
		},
	]

	const router = useRoutes(routes);

	return <>{router}</>;
};

export default App;
