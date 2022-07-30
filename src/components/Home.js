import Header from "./Header";
import { useLocation, useNavigate } from "react-router";
import { Button, Container, Col, Row } from "react-bootstrap"
import "./../styles/Home.css"
const Home = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    function handleRegister() {
        navigate('/register')
    }

    function handleLogin() {
        navigate('/directlogin')
    }

    return (
        <div className="Home" >
            <Header register={props.register} />
            <Container className="homeContainer">
                <>
                    <Row >
                        <Col sm={7}>
                            <div className="intro-text">
                                <h1>
                                    <span className="tweet">Tweet</span>
                                    <span className="app">  App</span>
                                </h1>

                                <p>
                                    Capture and Share the World's Moments⭐
                                </p>
                                <Button variant="primary" onClick={handleRegister}>Register</Button>{' '}
                                <Button variant="secondary" onClick={handleLogin}>Login</Button><br />
                                <a href="/forgot">Forgot Password</a>
                            </div>
                        </Col>
                        <Col sm={4} className="bird">
                            <center>
                                <iframe
                                    width="300"
                                    height="320"
                                    src="data:image/png;base64,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"
                                    title="login"
                                >
                                </iframe>
                            </center>
                        </Col>
                        <Col></Col>
                    </Row>
                </>
            </Container>
        </div>
    )
}
export default Home