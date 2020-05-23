import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/auth.context";
import { createContest } from "../../agent";
import styles from './ContestBuilder.module.scss';

export const ContestBuilder = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [activeQuestion, setActiveQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '', answer: ''
  });

  const [activeTest, setActiveTest] = useState(false);
  const [currentTest, setCurrentTest] = useState({
    question: '', answer: '',
    variants: ['', '', '', '']
  });
  const changeTest = (numberTest, value) => {
    const arr = [...currentTest.variants];
    arr[numberTest] = value;

    setCurrentTest({
      ...currentTest,
      variants: arr
    });
  }

  const handleAddQuestion = () => {
    setActiveTest(false);
    setCurrentQuestion({question: '', answer: ''});
    setActiveQuestion(true);
  }

  const handleAddTest = () => {
    setActiveQuestion(false);
    setCurrentTest({
      question: '', answer: '',
      variants: ['', '', '', '']
    });
    setActiveTest(true);
  }

  const handleSubmitContest = () => {
    createContest({
      name,
      answers,
      tasks
    }, token).then(res => {
      console.log(res.data);
      history.push(`/contest/${res.data.contestId}`);
    });
  }

  const handleSubmitQuestion = () => {
    setAnswers(answers.concat([currentQuestion.answer]));
    setTasks(tasks.concat([{ type: "question", question: currentQuestion.question }]));
    setCurrentQuestion({question: '', answer: ''});
    setActiveQuestion(false);
  }

  const handleSubmitTest = () => {
    setAnswers(answers.concat([currentTest.variants[parseInt(currentTest.answer) - 1]]));
    setTasks(tasks.concat([{ type: "test", question: currentTest.question, variants: currentTest.variants }]));
    setCurrentTest({
      question: '', answer: '',
      variants: ['', '', '', '']
    });
    setActiveTest(false);
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
          tasks.map((el, index) =>
            el.type === 'test' ?
            (
              <>
                <p>Питання {index}:</p>
                <p>{el.question}</p>
                <p>Варіанти:</p>
                {el.variants.map((variant, index) => <p>{index + 1} {variant}</p>)}
                <p>Відповідь:</p>
                <p>{answers[index]}</p>
              </>
            ) : (
              <>
                <p>Питання {index}:</p>
                <p>{el.question}</p>
                <p>Відповідь:</p>
                <p>{answers[index]}</p>
              </>
            )
          )
        }
      </div>

      <div className={activeQuestion ? '' : styles.unvisible}>
        <label>
          Вкажіть питання
          <input
            name="name"
            value={currentQuestion.question}
            onChange={event => setCurrentQuestion({...currentQuestion, question: event.target.value})}
            autoComplete={false}
          />
        </label><br/>

        <label>
          Вкажіть відповідь
          <input
            name="answer"
            value={currentQuestion.answer}
            onChange={event => setCurrentQuestion({...currentQuestion, answer: event.target.value})}
            autoComplete={false}
          />
        </label><br/>
        <input
          type="submit"
          value="Підтвердити запитання"
          onClick={handleSubmitQuestion}
        />
      </div>

      <div className={activeTest ? '' : styles.unvisible}>
        <label>
          Вкажіть питання
          <input
            name="name"
            value={currentTest.question}
            onChange={event => setCurrentTest({...currentTest, question: event.target.value})}
            autoComplete={false}
          />
        </label><br/>

        <label>
          Варіант 1
          <input
            value={currentTest.variants[0]}
            onChange={event => changeTest(0, event.target.value)}
            autoComplete={false}
          />
        </label><br/>
        <label>
          Варіант 2
          <input
            value={currentTest.variants[1]}
            onChange={event => changeTest(1, event.target.value)}
            autoComplete={false}
          />
        </label><br/>
        <label>
          Варіант 3
          <input
            value={currentTest.variants[2]}
            onChange={event => changeTest(2, event.target.value)}
            autoComplete={false}
          />
        </label><br/>
        <label>
          Варіант 4
          <input
            value={currentTest.variants[3]}
            onChange={event => changeTest(3, event.target.value)}
            autoComplete={false}
          />
        </label><br/>
        <label>
          Вкажіть номер відповіді
          <input
            value={currentTest.answer}
            onChange={event => setCurrentTest({...currentTest, answer: event.target.value})}
            autoComplete={false}
          />
        </label><br/>
        <input
          type="submit"
          value="Підтвердити тест"
          onClick={handleSubmitTest}
        />
      </div>

      <div>
        <button onClick={handleAddTest}>Add test</button>
        <button onClick={handleAddQuestion}>Add question</button>
      </div>

      <div>
        <button onClick={handleSubmitContest}>Submit contest</button>
      </div>
    </div>
  );
};
