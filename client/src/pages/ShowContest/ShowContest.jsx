import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContestById } from "../../agent";
import { getMark } from "../../agent";
import { createMark } from "../../agent";
import AuthContext from "../../contexts/Auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./ShowContest.module.scss";

export const ShowContest = () => {
  const contestId = useParams().id;
  const [mark, setMark] = useState(null);
  const [currentContest, setCurrentContest] = useState(null);
  const [answers, setAnswers] = useState([]);

  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    getMark(contestId, userId)
      .then(res => setMark(res.data.mark));

    getContestById(contestId, token).then((res) => {
      setCurrentContest(res.data.contest);
      setAnswers(new Array(res.data.contest.tasks.length).fill(""));
    });
  }, []);

  const changeHandler = (index, newValue) => {
    const newAnswers = [...answers];
    newAnswers[index] = newValue;
    setAnswers(newAnswers);
  };

  const submitHandler = () => {
  	createMark(contestId, answers, token)
      .then(res => setMark(res.data.mark));
	};

  return mark ? (
    <div className={styles.wrapper}>
      <h2>{currentContest?.name}</h2>

      <div className={styles.mark}>
        <p>Number of tasks: {currentContest?.tasks.length}</p>
        <p>Correct: {mark.correct}</p>
        <p>Estimation: {mark.estimation}</p>
      </div>
    </div>
  ) : (
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
                    <input
                      type="radio"
                      className={styles.checker}
                      name={`test ${index}`}
                      value={variant}
                      onClick={(event) =>
                        changeHandler(index, event.target.value)
                      }
                    />
                    <div className={styles.for_check}>{variant}</div>
                  </div>
                );
              })}
            </div>
          );
        } else if (task.type === "question") {
          return (
            <div className={styles.task} key={index}>
              <p className={styles.question}>{task.question}</p>
              <Input
                value={answers[index]}
                onChange={(text) => changeHandler(index, text)}
                placeholder="Enter answer"
                question={true}
              />
            </div>
          );
        }
      })}

      <Button value="Submit contest" onClick={submitHandler} />
    </div>
  );
};
