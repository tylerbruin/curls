import styled from 'styled-components'
import ExerciseDetails from './ExerciseDetails'
import { useState } from 'react';

const ListItem = styled.li`

    // margin-bottom: 0.35rem;
    margin-bottom: 1px;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    border-radius: 1px;
    transition: all 0.2s;

    &.active {
        margin: 1.25rem 0;

        .item_header:after  {
            width: calc(100% - 1.5rem);
        }

    }

    .item_header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem 0.75rem;
        position: relative;
        cursor: pointer;

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

        span {
            &.name {
                width: 47.5%;
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
    }

`

const Exercises = ({ exercise }) => {
    
    const [ToggleDetails, setToggleState] = useState(false)

    return (
        <>
            <ListItem className={ToggleDetails && "active"} >
                <div className="item_header" onClick={() => setToggleState(!ToggleDetails)}>
                    <span className="name">{exercise.name}</span>
                    <span className="method">{exercise.reps}&times;{exercise.sets}</span>
                    <span className="weight">{exercise.weight}{exercise.metric}</span>
                </div>
                {ToggleDetails && <ExerciseDetails exercise={exercise} />}
            </ListItem>
        </>
    )
}

export default Exercises
