import { Navbar, Nav, Container, Card, Button, Form } from "react-bootstrap"
import { FaTwitterSquare } from "react-icons/fa";
import AllHeader from "./AllHeader";
import CommonHeader from "./CommonHeader"
import { useNavigate } from 'react-router'

export default function Header(props) {

    let navigate = useNavigate();
    function handleIcon() {
        navigate('/')
    }
    let isRegistered = props.register;
    if (isRegistered) {
        return (
            <div className="Header">
                    <CommonHeader />
                {/* <body className="body">
                    <Container>
                        <div  className="heading">Tweet App</div>
                        <center>
                            <h3>Tweet app helps you connect with people in your life</h3>
                            <h5>Happy Tweeting!!</h5>
                            <Button variant="secondary">Register</Button>{' '}
                            <Button variant="secondary">Login</Button>
                        </center>
                    </Container>
                </body> */}
            </div >
        )
    }
    return (

        <div className="Header">
            <div>{props.register}</div>
            <Navbar bg="dark" variant="dark">.
                <Navbar.Brand>
                    <FaTwitterSquare className='m-1' onClick={handleIcon} />
                    Tweet App
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href='/forgot'>Forgot Password</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}