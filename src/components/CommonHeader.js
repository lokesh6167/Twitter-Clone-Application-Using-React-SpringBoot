import React from 'react'
import { Navbar, Nav, Container, Card, Button, Form } from "react-bootstrap"
import { FaTwitterSquare } from "react-icons/fa";
import { useNavigate } from 'react-router'

const CommonHeader = () => {
    let navigate = useNavigate();
    function handleIcon() {
        navigate('/')
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">.
                <Navbar.Brand>
                    <FaTwitterSquare className='m-1' onClick={handleIcon} />
                    Tweet App
                </Navbar.Brand>
            </Navbar>
        </div>
    )
}

export default CommonHeader