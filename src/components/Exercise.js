import styled from 'styled-components'
import ExerciseDetails from './ExerciseDetails'
import { useState, useRef } from 'react';
import useDoubleClick from 'use-double-click';


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
    padding: 0.75rem 0.75rem;
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
        margin: .75rem 0;

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

const Exercises = ({ exercise, addSession, deleteFunc }) => {
    // console.log("Rendering Exercise : ", exercise.name);
    
    const [ToggleDetails, setToggleState] = useState(false);
    const dbClickRef = useRef();

    // Allow for Single and Double Clicks
    useDoubleClick({
        onSingleClick: e => {
            // console.log(e, 'single click');
            setToggleState(!ToggleDetails);
        },
        onDoubleClick: e => {
            // console.log(e, 'double click');
            if(window.confirm(`Delete '${exercise.name}' from exercise list?`)) {
                let type = "exercise";
                deleteFunc(type, exercise.id)
            }
        },
        ref: dbClickRef,
        latency: 225
    });
    



    // Handle Printed Text if no values found
    let nameText = exercise.name;
    let repsSetsText = exercise.history[0]?.reps ? exercise.history[0].reps + "x" + exercise.history[0].sets : "N/A";
    let weightText = exercise.history[0]?.weight ? exercise.history[0].weight + exercise.metric : "N/A"

    return (
        <>
            <ListItem>
                <ItemHeader className={ToggleDetails && "active"} ref={dbClickRef}>
                    <span className="name">{nameText}</span>
                    <span className="method">{repsSetsText}</span>
                    <span className="weight">{weightText}</span>
                </ItemHeader>
                {ToggleDetails && <ExerciseDetails exercise={exercise} addSession={addSession} deleteFunc={deleteFunc} />}
            </ListItem>
        </>
    )
}

export default Exercises
