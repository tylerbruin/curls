import { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import Exercises from './components/Exercises'

function App() {
  const [ExerciseData, setExerciseData] = useState([
    {
      id: 1,
      name: "Curls",
      sets: 3,
      reps: 12,
      weight: 10,
      metric: "kg",
      history: [{
        date: "Tuesday",
        sets: 3,
        reps: 12,
        weight: 10,
        metric: "kg"
      },{
        date: "Friday",
        sets: 5,
        reps: 5,
        weight: 100,
        metric: "kg"
      },{
        date: "Saturday",
        sets: 4,
        reps: 8,
        weight: 6,
        metric: "kg"
      }]
    },
    {
      id: 2,
      name: "Squats",
      sets: 4,
      reps: 8,
      weight: 80,
      metric: "kg",
      history: [{
        date: "Monday",
        sets: 4,
        reps: 4,
        weight: 1100,
        metric: "lbs"
      }]
    },
    {
      id: 3,
      name: "Bench Press",
      sets: 5,
      reps: 5,
      weight: 60,
      metric: "lbs",
      history: [{
        date: "Never",
        sets: 100,
        reps: 2,
        weight: 1,
        metric: "lbs"
      },{
        date: "In Future",
        sets: 1200,
        reps: 100,
        weight: 133,
        metric: "lbs"
      }]
    }
  ])


  return (
    <>
      <Router>
        <Header />
        <main>
            <Exercises exercises={ExerciseData} />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;