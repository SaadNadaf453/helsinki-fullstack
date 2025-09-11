import { useState } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);
const StatisticLine = (props) =>{
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) =>{
  if(props.total == 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good}/>
        <StatisticLine text="Neutral" value={props.neutral}/>
        <StatisticLine text="Bad" value={props.bad}/>
        <StatisticLine text="All" value={props.total}/>
        <StatisticLine text="Average" value={props.average.toFixed(2)}/>
        <StatisticLine text="Positive" value={props.positive.toFixed(1) + "%"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  // average score: good is +1, neutral 0, bad -1
  const average = total === 0 ? 0 : (good - bad) / total;

  // positive percentage
  const positive = total === 0 ? 0 : (good / total) * 100;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />

      <h2>Statistics</h2>
      <Statistics 
      total={total} 
      good={good} 
      bad={bad} 
      neutral={neutral} 
      average={average} 
      positive={positive}/>
    </div>
  );
};

export default App;
