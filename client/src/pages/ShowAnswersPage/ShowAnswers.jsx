import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/Auth/";
import {getContestById, getUsers} from "../../agent";
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
	const [activeTable, setActiveTable] = useState(false);

	useEffect(() => {
		getContestById(contestId, token).then((res) => {
			setCurrentContest(res.data.contest);
		});
		getUsers(token).then((res) => {
			setUsers(res.data.users);
		});
	}, []);

	return (
		<div className={styles.wrapper}>
			<h2>{currentContest?.name}</h2>

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
