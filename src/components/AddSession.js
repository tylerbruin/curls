import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';


const Form = styled.form`
    margin: 1rem 0;

    h3 {
        font-weight: normal;
        font-size: .875rem;
    }

    fieldset {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;

        input {
            line-height: 2rem;
            padding: 0.125rem 0.35rem;
            margin-bottom: 0.35rem;
            border: 1px solid #6a6a6a;

            &#sets, &#reps, &#weight {
                width: 33%;
            }
        }
    }
   
`

const MetricCheckbox = styled.label`
    display: flex;
    align-items:center;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .radio {
        display: flex;
        align-items: center;
        position: relative;
        height: 1.875rem;
        width: 3.5rem;
        // border: 2px solid #4682b4;
        // background-color: #4682b4;
        border: 2px solid #6a6a6a;
        background-color: #6a6a6a;
        box-sizing: content-box;
        border-radius: 20px;
        transition: all 0.25s;
        // background: linear-gradient(to top right, #4682b4, #68b6f5);

        :after {
            content: "kg";
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.875rem;
            background-color: #fff;
            border-radius: 20px;
            width: 1.5rem;
            height: 1.5rem;
            padding: 0.125rem;

            margin-left: 0%;
            transform: translateX(0%);
            transition: all 0.2s;
        }

    }

    input:checked ~ .radio {

        &:after {
            content: "lbs";
            margin-left: 50%;
        }
    }

`

const SubmitButton = styled.button`
    display: block;
    background: linear-gradient(to top right, #4682b4, #68b6f5);
    color: #fff;
    padding: 1rem;
    width: 90%;
    margin: 0 auto;
`



const AddSession = ({ addSession, exercise }) => {

    // Set Date Input to current Time
    var currentDate = new Date();
    currentDate = currentDate.toISOString().substr(0,10);

    const [ExerciseDate, setExerciseDate] = useState(currentDate)
    const [ExerciseSets, setExerciseSets] = useState("")
    const [ExerciseReps, setExerciseReps] = useState("")
    const [ExerciseWeight, setExerciseWeight] = useState("")

    const clearForm = () => {
        setExerciseDate(currentDate)
        setExerciseSets("")
        setExerciseReps("")
        setExerciseWeight("")
    }

    const submitExercise = (e) => {
        e.preventDefault();

        let id = exercise.id;
        var session = {
            date: ExerciseDate,
            sets: ExerciseSets,
            reps: ExerciseReps,
            weight: ExerciseWeight
        }

        addSession(id, session)
        clearForm()
    }

    return (
        <Form onSubmit={submitExercise}>
            <h3>Add Session</h3>
            <fieldset>
                <input id="sets" name="sets" autoComplete="off" type="number" placeholder="Sets" value={ExerciseSets} onChange={(e) => setExerciseSets(e.target.value)} required />
                <input id="reps" name="reps" autoComplete="off" type="number" placeholder="Reps" value={ExerciseReps} onChange={(e) => setExerciseReps(e.target.value)} required />
                <input id="weight" name="weight" autoComplete="off" type="number" placeholder="Weight" value={ExerciseWeight} onChange={(e) => setExerciseWeight(e.target.value)} required />
                <input id="date" name="date" autoComplete="off" type="date" value={ExerciseDate} onChange={(e) => setExerciseDate(e.target.value)} required/>
                {/* <MetricCheckbox>
                    <input id="metric" name="metric" type="checkbox" value={ExerciseMetric} onChange={(e) => setExerciseMetric(e.target.checked)} />
                    <span className="radio"></span>
                </MetricCheckbox> */}
            </fieldset>
            <SubmitButton id="submit" type="submit">Add</SubmitButton>
        </Form>
    )
}


export default AddSession