import React from 'react';
import styles from './UsersList.module.scss';

export const UsersList = ({ users }) => {
	return (
		<div className={styles.users}>
			<table>
				<tr>
					<th>№</th>
					<th>First name</th>
					<th>Last name</th>
					<th>Email</th>
				</tr>
				{users.map((user, index) => (
					<tr>
						<td>{index + 1}</td>
						<td>{user.name}</td>
						<td>{user.surname}</td>
						<td>{user.email}</td>
					</tr>
				))}
			</table>
		</div>
	);
};
