import styled from 'styled-components'
import Exercise from './Exercise'

const ListWrapper = styled.div`
    position: relative;
    overflow: hidden;
    height: 85%;

    &:after {
        content: "";
        pointer-events: none;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        // background: linear-gradient(0deg, rgb(235, 235, 235), transparent);
    }
`

const List = styled.ul`
    list-style-type: none;
    // height: 100%;
    height: calc(var(--vh, 1vh) * 80);
    overflow: auto;
    padding: 1rem .45rem;
`

const ListHeader = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: steelblue;
    background: linear-gradient(to top right, #4682b4, #68b6f5);
    color: #fff;
    border: 0;
    padding: 0.75rem 0.75rem;
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

    p {
        margin-bottom: 2rem;
    }
`

const noResultsText = [
    'No exercise data found.',
    '* Double tap a exercise or session to delete.',
    '* To add a exercise or session, use the text box below',
    '* When adding, enter the exercise name or name, reps, sets and weight. e.g "Curls" or "Curls 12 3 24"'
    ];

                    

const Exercises = ({exercises, addSession, deleteFunc}) => {

    // console.log("Exercises = ", exercises);

    return (
        <ListWrapper>
            <List>
                <ListHeader>
                    <span className="name">Exercise</span>
                    <span className="sets">Sets</span>
                    <span className="weight">Weight</span>
                </ListHeader>
                {exercises.length === 0 && <NoResults>{noResultsText.map(text => <p>{text}</p>) }</NoResults>}
                {exercises.map((exercise) => (
                    <Exercise key={exercise.id} exercise={exercise} addSession={addSession} deleteFunc={deleteFunc} />
                ))}
            </List>
        </ListWrapper>
    )
}

export default Exercises