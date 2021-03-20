import styled from 'styled-components'

const Foot = styled.footer`
    padding: .75rem;
    background-color: rgb(169 169 169);
    color: #fff;
    text-align: center;
`

const Footer = () => {
    return (
        <Foot>
            <p>&copy; tbruin 2021</p>
        </Foot>
    )
}

export default Footer
