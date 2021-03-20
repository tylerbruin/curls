import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import ExercisesList from './components/ExercisesList'
// import testData from './teststate'
import testData2 from './teststate2'
import CreateExercise from './components/createExercise'

function App() {
  const [ExerciseData, setExerciseData] = useState([])

  // const [Settings, setSettings] = useState({
  //   dateFormat: "number",
  // })

  // LocalStorage Actions
  const saveState = (data) => {

    // If Object is provided to save, save it - or save React State object instead
    if (data) {
      localStorage.setItem('exerciseData', JSON.stringify(data));
    } else {
      // Set timer to save state to LocalStorage to allow for rerendering and idle app
      setTimeout(() => { 
        console.log("Saving State to localStorage", ExerciseData);
        localStorage.setItem('exerciseData', JSON.stringify(ExerciseData));
      }, 1000);
    }

    
  }

  const loadState = () => {
    let exerciseData = JSON.parse(localStorage.getItem('exerciseData'));
    
    if (exerciseData) {
      console.log("State Found");
      setExerciseData(exerciseData);
    } else {
      console.log("No State Found, set state to default data");
    //   setExerciseData(testData2);
    }
    
  }

  // Stateful Actions
  const createExercise = (name, reps, sets, weight) => {
    // console.log("stuff = ", name + reps + sets + weight);

    let newExercise = {};
    let currentDate = new Date();
    currentDate = currentDate.toISOString().substr(0,10);

    if (name, reps, sets, weight) {
      // If All Data values are present, create exercise with history
      
      newExercise = {
        id: Date.now(),
        name: name,
        metric: "kg",
        history: [{
			id: Date.now() * 2,
            date: currentDate,
            sets: sets,
            reps: reps,
            weight: weight,
        }]
      }

    } else {
      // Else, create exercise with no history
      newExercise = {
        id: Date.now(),
        name: name,
        metric: "kg",
        history: []
      }

    }
	
    // Add new Exercise to State and save to LocalStorage
    // setExerciseData([...ExerciseData, newExercise]);
    setExerciseData(prevState => {
      // Save to LocalStorage with clone of State, so we can both update LocalStorage and React UI
      var saveData = [...prevState];
      saveData.push(newExercise);
      saveState(saveData);
      
      // Return new State
      return [...prevState, newExercise];
    });

  }


  const deleteExercise = (id) => {
	  setExerciseData(ExerciseData => ExerciseData.filter(exercise => exercise.id !== id));
  }

  const deleteSession = (id) => {
	
  }

  const addSession = (id, session) => {
    console.log("Adding Session to", id, session);
  
    // Close ExerciseData, Find index of Exercise and Add Session to Exercise
    let exerciseIndex = ExerciseData.findIndex(ex => ex.id === id)
    
    setExerciseData(prevState => {
      // Add Exercise Session to History and sort by date
      var newState = ExerciseData[exerciseIndex]
      newState.history.push(session)
      newState.history.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });

      return [...prevState]
    });

    saveState()
  }

  useEffect(() => {
    // Load State from localStorage on application load
    loadState();
  }, []);

  return (
    <>
      <Router>
        <Header />
        <main>
            <ExercisesList exercises={ExerciseData} addSession={addSession}  />
            <CreateExercise createFunction={createExercise} />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;