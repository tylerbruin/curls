import styled from 'styled-components'
import { useState } from 'react'

const CreateForm = styled.form`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    // background-color: #cbd8e3;
    padding: 1rem;

    label {
        width: 100%;
        text-align: center;
        padding: 0.5rem;

        opacity: 0;
        visibility: hidden;
    }
`

const CreateInput = styled.input`
    height: 50px;
    // box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
    text-align: center;
    font-size: 1.125rem;
    flex: 1 1 auto;
    border-radius: 0;
`
const SubmitBtn = styled.button`
    padding: 0.1rem 0.5rem;
    min-width: 50px;
    font-size: 2rem;
    color: #fff;
    background: linear-gradient(to top right, #4682b4, #68b6f5);
`



const CreateExercise = ({createFunction}) => {
    
    const [ExName, setExName] = useState("");

    const submitCreateExercise = (e) => {
        e.preventDefault();

        // Regex to identify if input has Reps x Sets x Weight , e.g. curls 12 3 15
        const regex = /(?<name>[\w ]*) (?<reps>\d*) (?<sets>\d*) (?<weight>\d*)/
        let match = ExName.match(regex);

        console.log("match = ", match);

        // If Regex match finds Reps, Sets, Weight Data, Create Exercise with first entry to history
        if(match && match.length === 5) {
            let name = match.groups.name
            let reps = match.groups.reps
            let sets = match.groups.sets
            let weight = match.groups.weight

            createFunction(name, reps, sets, weight);
        } else {
            // Else, just create Exercise without history
            createFunction(ExName)
        }
        
        // Clear Form input
        setExName("");

    }

    return (
        <CreateForm onSubmit={submitCreateExercise} >
            <label htmlFor="create">Create/Add Exercise</label>
            <CreateInput id="create" autoComplete="off" placeholder="e.g 'Curls' or 'Curls 12 3 30'" required value={ExName} onChange={(e) => setExName(e.target.value)} />
            <SubmitBtn type="submit" aria-label="Add Exercise">+</SubmitBtn>
        </CreateForm>
    )
}

export default CreateExercise;
