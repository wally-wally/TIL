import React from 'react';
import { Navigate, Route, RouteObject, useNavigate, useParams } from 'react-router';
import { Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import ContactList from './pages/ContactList/ContactList';
import ContactView from './pages/ContactView/ContactView';
import NotFound from './pages/NotFound/NotFound';

const App: React.FC = () => {
	// const viewNavigationGuard = () => {
	// 	const { id } = useParams();
	// 	const navigate = useNavigate();

	// 	if (!id) {
	// 		navigate('/404', { replace: true });
	// 		return;
	// 	}
	// }

	const routes: RouteObject[] = [
		{
			path: '/',
			element: <Navigate replace to="/list/all" />
		},
		{
			path: '/list',
			element: <DefaultLayout />,
			children: [
				{
					index: true,
					element: <Navigate replace to="/list/all" />
				},
				{
					path: ':id',
					element: <ContactList />,
				}
			],
		},
		{
			path: '/view',
			// element: <DefaultLayout guard={viewNavigationGuard} />,
			element: <DefaultLayout />,
			children: [
				{
					index: true,
					element: <Navigate replace to="/404" />
				},
				{
					path: ':id',
					element: <ContactView />,
				}
			],
		},
		{
			path: '/404',
			element: <NotFound />
		}
	];

	const setRoute = (routes: RouteObject[], depth = 0) => {
		return routes.map(({ index, path, element, children }, routeIndex) => {
			return (
				<Route path={index ? '' : path} element={element} key={`${depth}-${routeIndex}`}>
					{children ? setRoute(children, depth + 1) : null}
				</Route>
			)
		})
	}

	return <Routes>{setRoute(routes)}</Routes>;
};

export default App;
