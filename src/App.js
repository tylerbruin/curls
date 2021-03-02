import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import Exercises from './components/Exercises'
// import testData from './teststate'
import testData2 from './teststate2'

function App() {
  const [ExerciseData, setExerciseData] = useState([])
  // const [Settings, setSettings] = useState({
  //   dateFormat: "number",
  // })

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
      console.log("No State Found, set state to default data");
      setExerciseData(testData2);
    }

  }

  // Stateful Actions
  const addExercise = () => {}
  const deleteExercise = () => {}
  const deleteSession = () => {}

  const addSession = (id, session) => {
    console.log("Adding Session to", id, session);
  
    // Close ExerciseData, Find index of Exercise and Add Session to Exercise
    let exerciseIndex = ExerciseData.findIndex(ex => ex.id === id)
    let newExerciseData = ExerciseData[exerciseIndex]

    // newExerciseData = newExerciseData.push(session)
    
    // Sort Sessions by date
    // newExerciseData[exerciseIndex].history.sort(function(a,b){
    //   return new Date(b.date) - new Date(a.date);
    // });
    
    setExerciseData(prevState => {
      console.log("prev = ", prevState)
      return [...prevState, newExerciseData.history]
    });

    // saveState()
  }

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