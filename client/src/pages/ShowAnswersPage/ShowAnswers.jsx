import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/Auth/";
import { getContestById } from "../../agent";
import { useParams } from "react-router-dom";
import styles from "./ShowAnswers.module.scss";

export const ShowAnswers = () => {
  const contestId = useParams().id;
  const { token } = useContext(AuthContext);

  const [currentContest, setCurrentContest] = useState(null);

  useEffect(() => {
    getContestById(contestId, token).then((res) => {
      setCurrentContest(res.data.contest);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>{currentContest?.name}</h2>

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
