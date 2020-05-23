import React, { useState } from "react";
import styles from './ContestBuilder.module.scss';

export const ContestBuilder = () => {
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [activeQuestion, setActiveQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({question: '', answer: ''});

  const handleAddQuestion = () => {
    setCurrentQuestion({question: '', answer: ''});
    setActiveQuestion(true);
  }

  const handleSubmitQuestion = () => {
    setAnswers(answers.concat([currentQuestion.answer]));
    setTasks(tasks.concat([{ type: "question", question: currentQuestion.question }]));
    setCurrentQuestion({question: '', answer: ''});
    setActiveQuestion(false);
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <label>
          Введіть назву контесту
          <input
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </label>
      </div>

      <div>
        {
          tasks.map((el, index) => {
            return (
              <>
                <p>Питання {index}:</p>
                <p>{el.question}</p>
                <p>Відповідь:</p>
                <p>{answers[index]}</p>
              </>
            )
          })
        }
      </div>

      <div className={activeQuestion ? '' : styles.unvisible}>
        <label>
          Вкажіть питання
          <input
            name="name"
            value={currentQuestion.question}
            onChange={event => setCurrentQuestion({...currentQuestion, question: event.target.value})}
          />
        </label><br/>
        <label>
          Вкажіть відповідь
          <input
            name="answer"
            value={currentQuestion.answer}
            onChange={event => setCurrentQuestion({...currentQuestion, answer: event.target.value})}
          />
        </label><br/>
        <input
          type="submit"
          value="Підтвердити запитання"
          onClick={handleSubmitQuestion}
        />
      </div>

      <div>
        <button>Add test</button>
        <button onClick={handleAddQuestion}>Add question</button>
      </div>
    </div>
  );
};
