import styled from 'styled-components'

const Foot = styled.footer`
    padding: 1rem;
    background-color: #6a6a6a;
    color: #fff;
    text-align: center;
`

const Footer = () => {
    return (
        <Foot className="footer">
            <p>Footer &copy; 2021</p>
        </Foot>
    )
}

export default Footer
