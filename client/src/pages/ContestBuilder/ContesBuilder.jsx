import React, { useState } from "react";
import styles from './ContentBuilder.module.scss';

export const ContestBuilder = () => {
  const protoContest = {
    name: '',
    answers: [],
    tasks: []
  };



  const [contest, setContest] = useState(protoContest);

  return (
    <div className={styles.wrapper}>
      <label>
        Введіть назву контесту
        <input
          value={contest.name}
          onClick={(event => setContest())}
        />
      </label>

      <button>Add test</button>
      <button>Add question</button>
    </div>
  );
};
