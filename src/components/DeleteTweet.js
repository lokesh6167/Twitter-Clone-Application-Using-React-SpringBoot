import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import {url} from './url'
const DeleteTweet = () => {

    let location = useLocation()
    let navigate = useNavigate()
    let [index, setIndex] = useState('')
    const [showDelete, setShowDelete] = useState(true)

    const handleClose = () => {
        setShowDelete(false)
    }

    function handleDelete() {
        index = location.state.tweet.tweetId
        console.log(index)
        if (index !== '') {
            fetch(`${url}/deleteTweet`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: index })
            }).then((res) => {
                if (res.status === 200) {
                    alert("Tweet deleted successfully")
                    handleClose()
                    navigate('/success', { state: { userId: location.state.userId, userName: location.state.userName } })
                }
                else {
                    alert("couldn't delete the tweet, try again!!")
                }
            })
        }
    }

    return (
        <div>
            <Modal show={showDelete}>
                <ModalHeader>
                    <ModalTitle>Delete Tweet</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <h3>Are you sure you want to delete this tweet?</h3>
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={handleDelete}>DELETE TWEET</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DeleteTweet