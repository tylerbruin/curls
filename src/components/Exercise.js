import styled from 'styled-components'
import ExerciseDetails from './ExerciseDetails'
import { useState } from 'react';

const ListItem = styled.li`

    margin-bottom: 0.25rem;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    border-radius: 1px;
`

const ItemHeader = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 0.75rem;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    transition: all 0.2s;

    &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0.75rem;
        width: 0;
        height: 3px;
        background: linear-gradient(to top right, #4682b4, #68b6f5);
        transition: all 0.3s;
    }
    
    &.active {
        margin: 1.25rem 0;

        :after {
            width: calc(100% - 1.5rem);
        }
    }

    span {
        font-size: 1rem;
        
        &.name {
            width: 47.5%;
            text-align: left;
        }
        &.sets {
            width: 20%;
        }
        &.weight {
            width: 20%;
        }
    }
`

const Exercises = ({ exercise, addSession }) => {
    
    const [ToggleDetails, setToggleState] = useState(false)

    
    return (
        <>
            <ListItem >
                <ItemHeader className={ToggleDetails && "active"} 
                onClick={() => setToggleState(!ToggleDetails)}>
                    <span className="name">{exercise.name}</span>
                    <span className="method">{exercise.history[0].reps}&times;{exercise.history[0].sets}</span>
                    <span className="weight">{exercise.history[0].weight}{exercise.metric}</span>
                </ItemHeader>
                {ToggleDetails && <ExerciseDetails exercise={exercise} addSession={addSession} />}
            </ListItem>
        </>
    )
}

export default Exercises
