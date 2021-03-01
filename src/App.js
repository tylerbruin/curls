import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import Exercises from './components/Exercises'
import testData from './teststate'
import testData2 from './teststate2'

function App() {
  const [ExerciseData, setExerciseData] = useState([])
  const [Settings, setSettings] = useState({
    dateFormat: "number",
  })

  // LocalStorage Actions
  const saveState = () => {
    console.log("Saving State to localStorage");
    localStorage.setItem('exerciseData', JSON.stringify(ExerciseData));
  }

  const loadState = () => {
    let exerciseData = JSON.parse(localStorage.getItem('exerciseData'));
    
    if (exerciseData) {
      console.log("State Found");

      setExerciseData(exerciseData);
    } else {
      console.log("No State Found, setting default, sorting by date");
      setExerciseData(testData2);
    }

  }

  const sortExerciseHistory = () => {
    // Sort History of each Exercise by Date
    console.log("Sorting State");
    // testData2[i].history = testData2[i].history.sort(function(a,b){
    //   return new Date(b.date) - new Date(a.date);
    // });

    let newExerciseData = ExerciseData.map(ex => ex.history.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    }));

    setExerciseData(newExerciseData);
  }

  // Stateful Actions
  const addExercise = () => {}
  const deleteExercise = () => {}

  const addSession = (id, session) => {
    console.log("Add Session", id);
  
    // Close ExerciseData, Find index of Exercise and Add Session to Exercise
    let newExerciseData = ExerciseData;
    let exerciseIndex = newExerciseData.findIndex(ex => ex.id === id)
    newExerciseData[exerciseIndex].history.push(session)
    
    // Sort & Set State and Save to LocalStorage
    sortExerciseHistory()
    // setExerciseData(newExerciseData)
    saveState()
  }

  const deleteSession = () => {}


  useEffect(() => {
    loadState();
  }, []);


  return (
    <>
      <Router>
        <Header />
        <main>
            <Exercises exercises={ExerciseData} addExercise={addExercise} deleteExercise={deleteExercise} addSession={addSession} deleteSession={deleteSession} />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;