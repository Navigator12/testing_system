import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/Auth/";
import {getContestById, getUsers, addUsersToContest} from "../../agent";
import {useParams} from "react-router-dom";
import styles from "./ShowAnswers.module.scss";
import UsersList from "../../components/UsersList";
import {faAngleDoubleDown, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const ShowAnswers = () => {
	const contestId = useParams().id;
	const {token} = useContext(AuthContext);

	const [currentContest, setCurrentContest] = useState(null);
	const [users, setUsers] = useState([]);
	const [usersNotInContest, setUsersNotInContest] = useState([]);
	const [activeTable, setActiveTable] = useState(false);
	const [activeAddTable, setActiveAddTable] = useState(false);
	const [selected, setSelected] = useState([]);

	const clickSelect = (id) => {
		let newArray = [...selected];
		let index = newArray.indexOf(id);

		if (index === -1)
			newArray.push(id);
		else
			newArray = newArray.filter(i => i !== id);

		setSelected(newArray);
	}

	useEffect( () => {
		getContestById(contestId, token).then((res) => {
			setCurrentContest(res.data.contest);

			return [...res.data.contest.students];
		}).then(async (students) => {
			const res = await getUsers(token);
			const ids = students.map(e => e._id);

			setUsers(res.data.users.filter(e => ids.includes(e._id)));
			setUsersNotInContest(res.data.users.filter(e => !ids.includes(e._id)));
		});
	}, []);

	const addUser = () => {
		addUsersToContest(contestId, selected.join(' '), token)
			.then(() => window.location.reload());
	}

	return (
		<div className={styles.wrapper}>
			<h1>{currentContest?.name}</h1>

			<div className={styles.usersListShowSection} onClick={() => setActiveTable(!activeTable)}>
        {(activeTable) ? (
          <>
            <FontAwesomeIcon icon={faAngleDoubleRight} size='2x'/>
            <span className={styles.usersListShow}>HIDE USERS</span>
            <FontAwesomeIcon icon={faAngleDoubleRight} size='2x'/>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faAngleDoubleDown} size='2x'/>
            <span className={styles.usersListShow}>SHOW USERS</span>
            <FontAwesomeIcon icon={faAngleDoubleDown} size='2x'/>
          </>
        )}
			</div>
      {activeTable && <UsersList users={users}/>}

			<div className={styles.usersListShowSection} onClick={() => setActiveAddTable(!activeAddTable)}>
				{(activeAddTable) ? (
					<>
						<FontAwesomeIcon icon={faAngleDoubleRight} size='2x'/>
						<span className={styles.usersListShow} onClick={addUser}>SAVE USERS</span>
						<FontAwesomeIcon icon={faAngleDoubleRight} size='2x'/>
					</>
				) : (
					<>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FontAwesomeIcon icon={faAngleDoubleDown} size='2x'/>
						<span className={styles.usersListShow}>ADD USERS</span>
						<FontAwesomeIcon icon={faAngleDoubleDown} size='2x'/>
					</>
				)}
			</div>
			{activeAddTable && <UsersList users={usersNotInContest} clickSelect={clickSelect}/>}

			{currentContest?.tasks.map((task, index) => {
				if (task.type === "test") {
					return (
						<div className={styles.task} key={index}>
							<p className={styles.question}>{task.question}</p>
							{task.variants.map((variant) => {
								return (
									<div key={variant} className={styles.variant}>
										{currentContest?.answers[index] !== variant ? (
											<div className={styles.answerWrongTest}>{variant}</div>
										) : (
											<div className={styles.answerTest}>{variant}</div>
										)}
									</div>
								);
							})}
						</div>
					);
				} else if (task.type === "question") {
					return (
						<div className={styles.task} key={index}>
							<p className={styles.question}>{task.question}</p>
							<div className={styles.answerQuestion}>
								{currentContest.answers[index]}
							</div>
						</div>
					);
				}
			})}
		</div>
	);
};
