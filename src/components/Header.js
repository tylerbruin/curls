import styled from 'styled-components'

const Head = styled.header`
    padding: .75rem;
    background-color: steelblue;
    background: linear-gradient(to top right, #4682b4, #68b6f5);

    h1 {
        color: #fff;
        font-size: 1.7rem;
    }
`

const Header = () => {
    return (
        <Head>
            <h1>Curls</h1>
        </Head>
    )
}



export default Header
