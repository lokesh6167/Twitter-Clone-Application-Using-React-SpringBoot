import { Container,Button, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import Header from "./Header"
import "../styles/Login.css"

export default function Login(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const redirectToSuccess = () => {
        navigate('/success',{state:{userId: location.state.userId, userName:location.state.userName}})
    }
    return (
        <div>
            <Header />
            <h3 className="success">Hey {location.state.name}, You are successfully registered!!</h3>
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>UserID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{location.state.name}</td>
                            <td>{location.state.userId}</td>
                        </tr>
                    </tbody>
                </Table>
                <div className="continueButton">
                    <Button aria-hidden="true" variant="success" onClick={redirectToSuccess}>Continue</Button>
                </div>
            </Container>
        </div>
    )
}