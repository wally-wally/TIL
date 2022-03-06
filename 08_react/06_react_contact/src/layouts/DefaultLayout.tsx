import React from 'react';
import { Outlet } from 'react-router';
import Header from './fragments/Header/Header';
import Sidebar from './fragments/Sidebar/Sidebar';

const DefaultLayout = ({ guard }: { guard?: () => void }) => {
	if (guard) {
		guard();
	}

	return (
		<>
			<Header />
			<Sidebar />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default DefaultLayout;
