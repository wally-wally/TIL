import React from 'react';
import { useParams } from 'react-router';

const ContactList = () => {
	const { id } = useParams();

	return (
		<div>
			주소록 리스트<br />
			{id}
		</div>
	);
};

export default ContactList;
