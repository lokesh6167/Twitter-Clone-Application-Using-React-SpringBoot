import { Container, Form, Button, Navbar } from "react-bootstrap";
import { useState } from "react"
import { useNavigate } from "react-router";
import { FaTwitterSquare } from "react-icons/fa";
import "../styles/ForgotPassword.css"
import CommonHeader from './CommonHeader'
import { url } from './url'

export default function ForgotPassword() {
    const [userid, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const userData = useState({})
    const navigate = useNavigate()

    const onSubmit = (data) => {
        data.preventDefault()
        userData.userid = userid
        userData.password = password
        console.log(userData)
        if (userid !== "" && password !== "") {
            fetch(`${url}/forgot`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userid: userid,
                    password: password
                })
            }).then((res) => {
                if (res.status === 200)
                    navigate('/directlogin')
            })
        }
        else {
            alert("Enter your credentials")
        }
    }

    return (
        <div>
            <CommonHeader/>
            <Container>
                <h3 className="forgotHeader">Forgot your password?</h3>
                <Form>
                    <Form.Group>
                        <b><Form.Label id="userid">UserId</Form.Label></b>
                        <Form.Control type="text" aria-labelledby="userid" data-testid="userid" name="userid" placeholder="Enter your user id!" onChange={e => setUserId(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <b><Form.Label id="password">Password</Form.Label></b>
                        <Form.Control type="password" aria-labelledby="password" data-testid="password" name="password" placeholder="Enter your password!" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="continueButton">
                        <Button aria-hidden="true" variant="success" onClick={onSubmit}>Continue</Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}