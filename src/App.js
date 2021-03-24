import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import ExercisesList from './components/ExercisesList'
// import testData from './teststate'
import testData2 from './teststate2'
import CreateExercise from './components/createExercise'
import debounce from './hooks/debounce';

function App() {
	const [ExerciseData, setExerciseData] = useState([])

	// const [Settings, setSettings] = useState({
	//   dateFormat: "number",
	// })

	// LocalStorage Actions
	// Save app state to localstorage for future use
	const saveState = debounce((data) => {
		
		// If Object is provided to save, save it - or save React State object instead
		if (data) {
			localStorage.setItem('exerciseData', JSON.stringify(data));
		} else {
			console.log("Saving State to localStorage", ExerciseData);
			localStorage.setItem('exerciseData', JSON.stringify(ExerciseData));
		}

	}, 800)

	// Check LocalStorage for exisitng data, 
	const loadState = () => {
		let exerciseData = JSON.parse(localStorage.getItem('exerciseData'));
		
		if (exerciseData) {
			// console.log("State Found");
			setExerciseData(exerciseData);
		} else {
			// console.log("No State Found, set state to default data");
		//   setExerciseData(testData2);
		}
		
	}

	// * Stateful Actions

	// Create new Exercise, with first session if provided
	const createExercise = (name, reps, sets, weight) => {

		// Check to see if Exercise already exists, if so, add as session
		if(ExerciseData.find(x => x.name === name)){
			
			// Convert data to Session object
			let id = ExerciseData.find(x => x.name === name).id
			let session = {
				id: Date.now() * 2,
				date: new Date().toISOString().substr(0,10),
				sets: sets,
				reps: reps,
				weight: weight
			}

			addSession(id, session);		
			return;
		}
	
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
		// TODO: revisit saveState usage
		setExerciseData(prevState => {
			// Save to LocalStorage with clone of State, so we can both update LocalStorage and React UI
			var saveData = [...prevState];
			saveData.push(newExercise);
			saveState(saveData);
			
			// Return new State
			return [...prevState, newExercise];
		});

	}

	// Delete any Exercise/Session Data from App
	const deleteEntry = (type, exerciseID, sessionID) => {

		if(type === "session"){
			console.log("Delete Session");

			// Find Exercise Index, and convert SessionID to Int
			let index = ExerciseData.findIndex(ex => ex.id === exerciseID)
			sessionID = parseInt(sessionID);
			
			let newState = ExerciseData;
			let newHistory = newState[index].history.filter(session => session.id !== sessionID);
			newState[index].history = newHistory;

			setExerciseData(prevState => {
				return [...prevState]
			})

		} else if (type === "exercise") {
			console.log("Delete Exercise");
			// let newState = ExerciseData;
			// newState = ExerciseData => ExerciseData.filter(exercise => exercise.id !== exerciseID)
			// setExerciseData(ExerciseData => ExerciseData.filter(exercise => exercise.id !== exerciseID));

			let index = ExerciseData.findIndex(ex => ex.id === exerciseID)
			let newState = ExerciseData;
			newState = newState.splice(index, 1);

			setExerciseData(prevState => {
				return [...prevState]
			})

		} else if (type === "all") {
			console.log("Delete All");
			setExerciseData([]);
		}
		
		// If a type was provided, assume action has taken and save state.
		if(type) {
			saveState()
		}
		
	}

	// Add Session to existing Exercise
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
						<ExercisesList exercises={ExerciseData} addSession={addSession} deleteFunc={deleteEntry} />
						<CreateExercise createFunction={createExercise} />
				</main>
				{/* <Footer /> */}
			</Router>
		</>
	);
}

export default App;