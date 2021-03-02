import { useState } from 'react'
import styled from 'styled-components'
import AddExercise from './AddExercise';

const Container = styled.div `
    margin: 0.75rem 0 .25rem;
    padding: 0.75rem 0.75rem 0.75rem;
`

const HistoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        font-weight: normal;
        font-size: 1rem;
    }

    button {
        padding: .125rem .6rem;
        border: 0;
        // background: linear-gradient(to top right, #4682b4, #68b6f5);
        background: #6a6a6a;
        color: #fff;
        border-radius: 2px;
        font-size: 1.45rem;
    }
`

const HistoryList = styled.ul `
    list-style-type: none;
    padding-top: .75rem;
`

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // margin: 0.375rem 0;
    padding: 0.85rem 0 0.85rem 2%;
    // border-top: 2px solid rgb(230,230,230);

    &:nth-child(even){
        background-color: rgb(240,240,240);
    }

    span {
        &.name {
            width: 45.5%;
        }
        &.sets {
            width: 20%;
            text-align: center;
        }
        &.weight {
            width: 20%;
            text-align: center;
        }
    }
    
`


const ExerciseDetails = ({ exercise, addSession }) => {
    
    const [ToggleAdd, setToggleAdd] = useState(false)

    const toggleAddExercise = () => {
        setToggleAdd(!ToggleAdd)
    }


    const excerciseHistory = exercise.history;

    return (
        <>
            <Container>
                <HistoryHeader>
                    <h3>Previous Sessions</h3>
                    <button type="button" onClick={() => toggleAddExercise(exercise.id)}>{ToggleAdd ? `x` : '+'}</button>
                </HistoryHeader>
                {ToggleAdd && <AddExercise addSession={addSession} exercise={exercise} />}
                <HistoryList>
                    {/* {excerciseHistory.slice(0, 6).map((exercise, index) => (
                        <ListItem key={index}>
                            <span className="name">{exercise.date}</span>
                            <span className="method">{exercise.reps}&times;{exercise.sets}</span>
                            <span className="weight">{exercise.weight}{exercise.metric}</span>
                        </ListItem>
                    ))} */}
                    {exercise.history.slice(0, 6).map((exercise, index) => (
                        <ListItem key={index}>
                            <span className="name">{exercise.date}</span>
                            <span className="method">{exercise.reps}&times;{exercise.sets}</span>
                            <span className="weight">{exercise.weight}{exercise.metric}</span>
                        </ListItem>
                    ))}
                </HistoryList>
            </Container>
        </>
    )
}

export default ExerciseDetails
