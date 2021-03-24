import { useState, useRef } from 'react'
import styled from 'styled-components'
import AddSession from './AddSession';
import useDoubleClick from 'use-double-click';

const Container = styled.div `
    margin: 0.25rem 0 .25rem;
    padding: 0.5rem 0.85rem;
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

const ExerciseDetails = ({ exercise, addSession, deleteFunc }) => {
    
    const [ToggleAdd, setToggleAdd] = useState(false)
    const dbClickRef = useRef();

    // Allow for Single and Double Clicks
    useDoubleClick({
        onSingleClick: e => {
            return;
        },
        onDoubleClick: e => {
            // Identify Session ID
            let targetEl = e.target;
            let targetID = targetEl.dataset.id || targetEl.closest('[data-id]')?.dataset.id;

            // If a Session ID has been found, proceed to prompt user to delete session
            if (targetID) {
                if(window.confirm(`Delete this session from history?`)) {
                    let type = "session";
                    deleteFunc(type, exercise.id, targetID)
                }
            }
            
        },
        ref: dbClickRef,
        latency: 225
    });

    // const clickHandler = (id) => {
    //     console.log("I have been clicked", id);
    // }

    return (
        <>
            <Container>
                <HistoryHeader>
                    <h3>Previous Sessions</h3>
                    <button type="button" onClick={() => setToggleAdd(!ToggleAdd)} >{ToggleAdd ? `x` : '+'}</button>
                </HistoryHeader>
                {ToggleAdd && <AddSession addSession={addSession} exercise={exercise} />}
                <HistoryList ref={dbClickRef} >
                    {exercise.history.slice(0, 6).map((session) => (
                        <ListItem key={session.id} data-id={session.id} >
                            <span className="name" >{session.date}</span>
                            <span className="method">{session.reps}&times;{session.sets}</span>
                            <span className="weight">{session.weight}kg</span>
                        </ListItem>
                    ))}
                </HistoryList>
            </Container>
        </>
    )
}

export default ExerciseDetails