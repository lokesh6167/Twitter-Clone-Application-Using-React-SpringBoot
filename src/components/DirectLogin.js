import { useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import Header from "./Header"
import { url } from './url'
import "../styles/Login.css"

export default function DirectLogin() {
    let flag = 'false'
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        let uid = ''
        console.log(username)
        if (username !== '' && password !== '') {
            for (let i = 0; i < userData.length; i++) {
                if (username === userData[i].userName && password === userData[i].password) {
                    flag = 'true'
                    uid = userData[i].userId
                    break
                }
            }

            if (flag === 'true') {
                console.log(uid)
                navigate('/success', { state: { userId: uid, userName: username }})
            }

            else {
                alert('Enter correct credentials or register!!')
            }
        }
        else {
            alert("Enter your credentials")
        }
    }
    const redirettoregister = () => {
        navigate("/register")
    }

    useEffect(() => {
        fetch(`${url}/users/all`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setUserData(data)
                console.log(userData)
            })
    }, [username]);

    return (
        <div>
            <Header />
            <Container>
                <h4 className="LoginHeader">Welcome to tweet app, Login to view tweets from your friends</h4>
                <Form>
                    <Form.Group>
                        <Form.Label id="username">Username</Form.Label>
                        <Form.Control type="text" aria-labelledby="username" data-testid="username" name="username" placeholder="Enter your username!" onChange={e => setUserName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id="password">Password</Form.Label>
                        <Form.Control type="password" aria-labelledby="password" data-testid="password" name="password" placeholder="Enter your password!" onChange={e => setPassword(e.target.value)} required='true' />
                    </Form.Group>
                    <div className="regButton">
                        <Button variant="primary" onClick={handleSubmit} formNoValidate>LOGIN</Button>{' '}
                        <Button aria-hidden="true" variant="success" onClick={redirettoregister}>REGISTER</Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}