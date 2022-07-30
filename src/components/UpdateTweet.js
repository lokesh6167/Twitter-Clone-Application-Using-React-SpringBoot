import React, { useState } from 'react'
import {  Col, Button, Form, Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router'
import SuccessHeader from './SuccessBody'
import { url } from './url'

const UpdateTweet = () => {

    let navigate = useNavigate()
    let location = useLocation()
    let index = useState()
    let [tweet, setTweet] = useState('')
    let [showUpdate, setShowUpdate] = useState(true)
    const handleClose = () => setShowUpdate(false);

    function changeTweet() {
        index = location.state.tweet.tweetId
        console.log(index)
        if(tweet!==''){
        fetch(`${url}/updateTweet/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id:index,
                content:tweet
            })
        }).then((res) => {
            if (res.status === 200) {
                alert("Tweet successfully Updated")
                setShowUpdate(false)
                navigate('/viewtweets',{state:{userId:location.state.userId,userName:location.state.userName}})
            } else {
                alert("try again!!")
            }
        })
    }
        console.log(tweet)
    }
    console.log(location.state.tweet)

    return (
        <div>
            <SuccessHeader />
            <Modal show={showUpdate}>
                <ModalHeader>
                    <ModalTitle>Update Tweet</ModalTitle>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className='p-2'>Previous Tweet</Form.Label>
                            <Form.Control disabled className='p-2' type='text' placeholder={location.state.tweet.tweetContent}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='p-2'>Enter new Tweet</Form.Label>
                            <Form.Control className='p-2' type="text" name="newTweet" placeholder="Enter new Tweet" onChange={e => setTweet(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <center>
                        <Col><Button type='submit' onClick={changeTweet}>Update</Button></Col>
                    </center>
                </ModalFooter>


            </Modal>
        </div>

    )
}

export default UpdateTweet