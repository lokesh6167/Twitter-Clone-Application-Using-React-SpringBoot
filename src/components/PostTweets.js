import React from 'react'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaStickyNote } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router';
import { url } from './url'
import Menu from './NavBar'

const PostTweets = () => {
    const [tweetContent, setTweetContent] = useState('')
    let location = useLocation()
    let navigate = useNavigate()
    // console.log(location)

    const handlePost = (event) => {
        event.preventDefault()
        if (location.state.userName === undefined) {
            alert("Something went wrong , please login again")
            navigate('/')
        }
        else {
            if (tweetContent === '') {
                alert("enter tweet content")
            }
            else {
                console.log(tweetContent)
                fetch(`${url}/addTweet`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: location.state.userName,
                        tweet: tweetContent
                    })
                }).then((res) => {
                    if (res.status === 200) {
                        alert('posted ur tweet')
                        navigate('/success', { state: { userName: location.state.userName, userId: location.state.userId } })
                    }
                    else {
                        alert('something went wrong')
                    }
                })
            }
        }
    }

    useEffect(() => {
        console.log(location)
    })

    return (
        <div>
            <Menu />
            <Container>
                <Row>
                    <Col>
                        <Card className='p-1 mt-5'>
                            <Card.Header className='text-center font-weight-bold bg-secondary text-white'>Post New Tweet</Card.Header>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className='p-2'>Enter Tweet Content:</Form.Label>
                                    <Form.Control className='p-2' type="text" name="tweetContent" placeholder="Enter tweet to post..." onChange={e => setTweetContent(e.target.value)} required></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <center><Button className="bg-danger border border-2 border-danger" type="danger" onClick={handlePost}><FaStickyNote className='m-1' />Post Tweet</Button></center>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PostTweets