import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/auth.context";
import { createContest } from "../../agent";
import styles from './ContestBuilder.module.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';

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
      <Input
        value={name}
        label="Name of contest"
        onChange={text => setName(text)}
      />

      <div className={styles.tests}>
        {
          tasks.map((el, index) =>
            el.type === 'test' ?
            (
              <div className={styles.test}>
                <h2>Test {index+1}:</h2>
                <h3>{el.question}</h3>
                <h2>Variants:</h2>
                <div className={styles.variants}>
                  {el.variants.map((variant, index) => <h3>{index + 1} {variant}</h3>)}
                </div>
                <h2>Answer:</h2>
                <h3>{answers[index]}</h3>
              </div>
            ) : (
              <div className={styles.test}>
                <h2>Test {index+1}:</h2>
                <h3>{el.question}</h3>
                <h2>Answer:</h2>
                <h3>{answers[index]}</h3>
              </div>
            )
          )
        }
      </div>

      <div className={activeQuestion ? '' : styles.unvisible}>
        <Input
          value={currentQuestion.question}
          onChange={text => setCurrentQuestion({...currentQuestion, question: text})}
          label="Question"
          question={true}
        />

        <Input
          value={currentQuestion.answer}
          onChange={text => setCurrentQuestion({...currentQuestion, answer: text})}
          label="Answer"
          question={true}
        />

        <div className={styles.test_section}>
          <Button
            onClick={handleSubmitQuestion}
            value="Submit"
            variant="black"
          />
          <Button
            onClick={() => setActiveQuestion(false)}
            value="Cancel"
            variant="black"
          />
        </div>
      </div>

      <div className={activeTest ? '' : styles.unvisible}>
        <Input
          value={currentTest.question}
          onChange={text => setCurrentTest({...currentTest, question: text})}
          label="Question"
          question={true}
        />

        <Input
          value={currentTest.variants[0]}
          onChange={text => changeTest(0, text)}
          label="Variant 1"
          question={true}
        />
        <Input
          value={currentTest.variants[1]}
          onChange={text => changeTest(1, text)}
          label="Variant 2"
          question={true}
        />
        <Input
          value={currentTest.variants[2]}
          onChange={text => changeTest(2, text)}
          label="Variant 3"
          question={true}
        />
        <Input
          value={currentTest.variants[3]}
          onChange={text => changeTest(3, text)}
          label="Variant 4"
          question={true}
        />

        <Input
          value={currentTest.answer}
          onChange={text => setCurrentTest({...currentTest, answer: text})}
          label="Number of answer"
          question={true}
        />

        <div className={styles.test_section}>
          <Button
            onClick={handleSubmitTest}
            value="Submit"
            variant="black"
          />
          <Button
            onClick={() => setActiveTest(false)}
            value="Cancel"
            variant="black"
          />
        </div>
      </div>

      <div className={styles.footer_section}>
        <Button onClick={handleAddTest} value="Add test" variant="primary" />
        <Button onClick={handleAddQuestion} value="Add Question" variant="primary" />
        <Button onClick={handleSubmitContest} value="Submit contest" variant="black" />
      </div>
    </div>
  );
};
