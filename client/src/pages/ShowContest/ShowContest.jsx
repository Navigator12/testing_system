import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getContestById } from '../../agent';
import styles from './ShowContest.module.scss';

export const ShowContest = () => {

	const contestId = useParams().id;
	const [currentContest, setCurrentContest] = useState({});

	useEffect(() => {
		getContestById(contestId)
			.then(res => setCurrentContest(res.data.contest));
	}, [])


	return (
		<div>
			<h2 className={styles.header__contest}>{currentContest.name}</h2>
			{currentContest.tasks?.map(task =>
				(<div className={styles.card}>

					{(task.type === "test") ?
						<>
							<p className={styles.title}>{task.question}</p>
							{task.variants.map(variant =>
								(
									<p><input type="radio" className={styles.checkbox}/>{variant}</p>
								))}
						</>
						:
						<>
						<p className={styles.title}>{task.question}</p>
							<input type="text" placeholder="Enter answer"/>
						</>
					}
				</div>)
			)}

		</div>
	);
};

