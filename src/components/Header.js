import styled from 'styled-components'

const Head = styled.header`
    display: flex;
    justify-content: space-between;

    padding: .75rem;
    background-color: steelblue;
    background: linear-gradient(to top right, #4682b4, #68b6f5);

    h1 {
        color: #fff;
        font-size: 1.7rem;
    }

    button {
        padding: 0.5rem 1rem;
    }
`

const Header = ( { deleteFunc } ) => {
    return (
        <Head>
            <h1>Curls</h1>
            <button onClick={() => { deleteFunc("all") } }> Delete All</button>
        </Head>
    )
}



export default Header
