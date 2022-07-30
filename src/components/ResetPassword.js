import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import Menu from './NavBar'
import { url } from './url'

const ResetPassword = () => {

    let location = useLocation()
    let navigate = useNavigate()
    const userid = location.state.userId
    const username = location.state.userName
    let [oldPassword, setOldPwd] = useState('')
    let [newPassword, setNewPwd] = useState('')
    const [userData, setUserData] = useState({})

    function handleReset(event) {
        event.preventDefault()
        if (oldPassword === '' || newPassword === '') {
            alert("please enter data in all the fields")
        }
        else if (oldPassword !== userData.password) {
            alert("Old password is incorrect,please try again!!")
        }

        else if (oldPassword === newPassword) {
            alert("Old password and new password cannot be same")
        }

        else {
            fetch(`${url}/forgot`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userid: userid,
                    password: newPassword
                })
            }).then(res => {
                if (res.status === 200) {
                    alert("Password changed successfully")
                    navigate('/success', { state: { userId: userid, userName: username } })
                }
            })
        }
    }

    useEffect(() => {
        console.log(userid)
        console.log(location)
        fetch(`${url}/user/searchid`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: userid
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            setUserData(data)
        })
    }, [])

    return (
        <div>
            <Menu />
            <Container>
                <Row>
                    <Col className='col-sm-8'>
                        <Card className='p-1 mt-5'>
                            <Card.Header className='text-center font-weight-bold bg-secondary text-white'>Reset Password</Card.Header>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className='p-2'>Username:</Form.Label>
                                    <Form.Control className='p-2' type="text" name="username" placeholder="Enter username" value={location.state.userName} disabled></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className='p-2'>Enter Old Password:</Form.Label>
                                    <Form.Control className='p-2' type="password" name="oldPwd" placeholder="Enter old password" onChange={e => setOldPwd(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className='p-2'>Enter New Password:</Form.Label>
                                    <Form.Control className='p-2' type="password" name="newPwd" placeholder="Enter new password" onChange={e => setNewPwd(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <center><Button className="p-3 bg-danger" type="danger" onClick={handleReset}>Change Password</Button></center>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResetPassword