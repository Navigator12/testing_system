import React, {useContext, useEffect, useState} from 'react';
import styles from './ContestList.module.scss';
import { getContestsByUser } from "../../agent";
import { AuthContext } from "../../contexts/Auth/auth.context";
import { useHistory } from "react-router-dom";

export const ContestList = () => {

	const history = useHistory();
	const { token } = useContext(AuthContext);
	const [contests, setContests] = useState([]);

	useEffect(() => {
		getContestsByUser(token).then(res => setContests(res.data.contests))
	}, [])

	const handleRedirect = (id) => {
		history.push(`/contest/${id}`);
	}

	return (
		<div className={styles.wrapper}>
			<ul className={styles.ulItems}>
				{contests.map((contest, index) => (
					<li className={styles.liItem} onClick={() => handleRedirect(contest._id)} key={contest._id}>
						{index+1}. {contest.name}
						<span>{new Date(contest.date).toLocaleDateString()}</span>
					</li>
				))}
			</ul>

		</div>
	);
};
