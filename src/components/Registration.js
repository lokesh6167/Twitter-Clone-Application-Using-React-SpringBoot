import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import "../styles/Registration.css"
import { Form, Button, Container } from 'react-bootstrap';
import { url } from './url'

export default function Registration() {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = (data) => {
        data.preventDefault();
        const newErrors = findFormErrors()
        console.log(newErrors)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            let customerId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
            form.userId = "U" + customerId
            console.log(form.firstName)
            fetch(`${url}/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            }).then(() => {
                navigate('/login', { state: { userId: form.userId, userName: form.userName, name: form.firstName } })
            })
        }
    }

    const findFormErrors = () => {
        const { firstName, lastName, userName, password, email, gender } = form
        const newErrors = {}
        const emailregex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i;
        const nameregex = /^[aA-zZ\s]*$/
        if (!firstName || firstName === '') newErrors.firstName = 'cannot be blank!'
        else if (nameregex.test(firstName) === false) newErrors.firstName = 'can contain only letters and spaces'
        if (!lastName || lastName === '') newErrors.lastName = 'cannot be blank!'
        else if (nameregex.test(lastName) === false) newErrors.lastName = 'can contain only letters and spaces'
        if (emailregex.test(email) === false) newErrors.email = "invalid email(should contain a '.' & '@')"
        if (!password || password === '') newErrors.password = 'cannot be blank'
        if (!userName || userName === '') newErrors.userName = 'cannot be blank'
        else if (nameregex.test(userName) === false) newErrors.userName = 'can contain only letters and spaces'
        if (!gender || gender === '') newErrors.gender = 'select the gender'
        return newErrors
    }

    return (
        <div>
            <Header />
            <Container>
                <h3 className="Reg-Header">User Registration</h3>

                <Form.Group className="mb-3">
                    <Form.Label id="fname">First Name:</Form.Label>
                    <Form.Control type="text" aria-labelledby="fname" name="fname" placeholder="Firstname" onChange={e => setField('firstName', e.target.value)} isInvalid={!!errors.firstName} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label id="lname">Last Name:</Form.Label>
                    <Form.Control type="text" aria-labelledby="lname" name="lname" placeholder="Lastname" onChange={e => setField('lastName', e.target.value)} isInvalid={!!errors.lastName} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label id="email">Email</Form.Label><br />
                    <Form.Control type="text" aria-labelledby="email" data-testid="email" name="email" placeholder="Email" onChange={e => setField('email', e.target.value)} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group>
                    <Form.Label id="gender">Gender</Form.Label>
                    <Form.Control as="select" aria-labelledby="gender" data-testid="gender" onChange={e => setField('gender', e.target.value)} isInvalid={!!errors.name}>
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid' data-testid="gendererr">
                        {errors.gender}
                    </Form.Control.Feedback>
                </Form.Group>
                <p></p>

                <Form.Group className="mb-3">
                    <Form.Label id="username">UserName</Form.Label><br />
                    <Form.Control type="text" name="username" aria-labelledby="username" data-testid="username" placeholder="Username" onChange={e => setField('userName', e.target.value)} isInvalid={!!errors.userName} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.userName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label id="password">Password</Form.Label><br />
                    <Form.Control type="password" aria-labelledby="password" data-testid="password" name="password" placeholder="Password" onChange={e => setField('password', e.target.value)} isInvalid={!!errors.password} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="regButton">
                    <Button type='submit' onClick={handleSubmit}>Register</Button>
                </div>
            </Container>
        </div>
    )
}