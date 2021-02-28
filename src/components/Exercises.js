import styled from 'styled-components'
import Exercise from './Exercise'

const List = styled.ul`
    list-style-type: none;

    .list_header {
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
    }
`

const Exercises = ({exercises, metric}) => {
    return (
        <List>
            <li className="list_header">
                <span className="name">Exercise</span>
                <span className="sets">Sets</span>
                <span className="weight">Weight</span>
            </li>
            {exercises.map((exercise) => (
                <Exercise key={exercise.id} exercise={exercise} />
            ))}
        </List>
    )
}

export default Exercises