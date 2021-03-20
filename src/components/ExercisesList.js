import styled from 'styled-components'
import Exercise from './Exercise'

const ListWrapper = styled.div`
    position: relative;
    overflow: hidden;
    height: 70vh;

    &:after {
        content: "";
        pointer-events: none;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        background: linear-gradient(0deg, rgb(235, 235, 235), transparent);
    }
`

const List = styled.ul`
    list-style-type: none;
    height: 100%;
    overflow-y: scroll;
    padding: 1rem .45rem;
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
const NoResults = styled.li`
    text-align: center;
    padding: 1rem;
`

const Exercises = ({exercises, addSession}) => {

    console.log("Exercises = ", exercises);

    return (
        <ListWrapper>
            <List>
                <ListHeader>
                    <span className="name">Exercise</span>
                    <span className="sets">Sets</span>
                    <span className="weight">Weight</span>
                </ListHeader>
                {exercises.length === 0 && <NoResults><p>No exercise data found</p></NoResults>}
                {exercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} addSession={addSession} />
                ))}
            </List>
        </ListWrapper>
    )
}

export default Exercises