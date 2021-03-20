import styled from 'styled-components'
import { useState } from 'react'

const CreateForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: #cbd8e3;
    margin: .5rem;
    padding: .5rem;

    label {
        text-align: center;
        // opacity: 0;
        // visibility: hidden;
    }

`
const CreateInput = styled.input`
    height: 50px;
    flex: 1 1 auto;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
    text-align: center;
    font-size: 1.125rem;
`


const CreateExercise = ({createFunction}) => {

    const [ExName, setExName] = useState("");

    const submitCreateExercise = (e) => {
        e.preventDefault();

        // Regex to identify if input has Reps x Sets x Weight , e.g. curls 12 3 15
        const regex = /([\w ]*) (\d*) (\d*) (\d*)/
        let match = ExName.match(regex);

        console.log("match = ", match);

        // If Regex match finds Reps, Sets, Weight Data, Create Exercise with first entry to history
        if(match) {
            let name = match[1]
            let reps = match[2]
            let sets = match[3]
            let weight = match[4]

            createFunction(name, reps, sets, weight);
        } else {
            // Else, just create Exercise without history
            createFunction(ExName)
        }
        
    }

    return (
        <CreateForm onSubmit={submitCreateExercise} >
            <label htmlFor="create">Create/Add Exercise</label>
            <CreateInput id="create" autoComplete="off" placeholder="e.g Curls or Curls 12 3 35" value={ExName} onChange={(e) => setExName(e.target.value)} />
        </CreateForm>
    )
}

export default CreateExercise;
