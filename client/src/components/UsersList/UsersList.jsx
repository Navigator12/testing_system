import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UsersList.module.scss';

export const UsersList = ({ users, allowSelect, clickSelect }) => {
	const [selectedColor, setSelectedColor] = useState(new Array(users.length).fill(false));

	const changeSelected = (index) => {
		const newArray = [...selectedColor];
		newArray[index] = !newArray[index];
		setSelectedColor(newArray);
	}

	return (
		<div className={styles.users}>
			<table>
				<tbody>
					<tr>
						<th>№</th>
						<th>First name</th>
						<th>Last name</th>
						<th>Email</th>
					</tr>
					{users.map((user, index) => (
						<tr
							onClick={() => {
								clickSelect(user._id);
								allowSelect && changeSelected(index);
							}}
							key={user.email}
							className={selectedColor[index] ? styles.selected : ''}
						>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td>{user.surname}</td>
							<td>{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

UsersList.propTypes = {
	users: PropTypes.arrayOf(Object).isRequired,
	allowSelect: PropTypes.bool,
	clickSelect: PropTypes.func,
};

UsersList.defaultProps = {
	useState: [],
	allowSelect: false,
	clickSelect: () => {},
};