import styled from 'styled-components'
import Exercise from './Exercise'

const List = styled.ul`
    list-style-type: none;
`

const ListHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: steelblue;
    background: linear-gradient(to top right, #4682b4, #68b6f5);
    color: #fff;
    border: 0;
    padding: 1.125rem 0.75rem;
    margin-bottom: 0.35rem;
    cursor: auto;

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
`


const Exercises = ({exercises, addSession}) => {

    console.log("Exercises = ", exercises);

    return (
        <List>
            <ListHeader>
                <span className="name">Exercise</span>
                <span className="sets">Sets</span>
                <span className="weight">Weight</span>
            </ListHeader>
            {exercises.length === 0 && <li><p>No records found</p></li>}
            {exercises.map((exercise) => (
                <Exercise key={exercise.id} exercise={exercise} addSession={addSession} />
            ))}
        </List>
    )
}

export default Exercises