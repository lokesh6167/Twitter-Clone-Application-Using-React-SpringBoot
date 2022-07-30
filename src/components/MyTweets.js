import { useEffect, useState } from "react";
import Menu from "./NavBar"
import { useLocation } from "react-router-dom";
import { Container, Card, Row, Col, Button, Modal, Table, ModalHeader, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import {   FaUserSecret } from "react-icons/fa";
import { url } from './url'

let tweets = []
let dummy = []
const MyTweets = () => {

    let [myTweets, setMyTweets] = useState(tweets)
    let username = ''
    let location = useLocation()
    const [postReplies, setPostReplies] = useState(dummy)
    let [filterReplies, setFilterReplies] = useState([])
    let replies = []
    const [viewReplyModal, setViewReplyModal] = useState(false)
    const handleReplyModal = () => setViewReplyModal(false);


    function fetchMyTweets() {
        console.log(location)
        username = location.state.userName
        console.log(username)
        fetch(`${url}/allTweetsOfUser`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: username
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                myTweets = data
                setMyTweets(myTweets)
                console.log(myTweets)
            })
    }

    function fetchUserReplies() {
        fetch(`${url}/getAllReplies`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setPostReplies(data)
            })
    }

    // view replies for a particular post
    function viewPostReplies(data) {
        console.log(data)
        replies = []
        let length = postReplies.length
        for (let i = 0; i < length; i++) {
            if (postReplies[i].tweetId === data) {
                replies.push(postReplies[i])
            }
            filterReplies = replies
        }
        setFilterReplies(filterReplies)
        console.log(filterReplies)
        setViewReplyModal(true)
    }

    useEffect(() => {
        fetchMyTweets()
        fetchUserReplies()

    }, []);

    return (
        <div>
            <Menu />
            <div>
                <Container>
                    {myTweets.map(function (tweet, index) {
                        return (
                            <Card>
                                <Card.Body>
                                    <>
                                        <FaUserSecret className='m-1' />
                                        <b>{tweet.username}</b>
                                    </>
                                    <Card.Text key={index}>{tweet.tweetContent}</Card.Text>
                                    <Card.Link variant="outline-secondary" onClick={(event) => viewPostReplies(tweet.tweetId)}>View replies</Card.Link>
                                </Card.Body>
                                <Card.Footer>Tweet Post Time :{tweet.postTime}</Card.Footer>
                            </Card>
                        )
                    })}
                    <Modal show={viewReplyModal}>
                        <ModalHeader>
                            <ModalTitle>Replies</ModalTitle>
                            <Button variant="secondary" onClick={handleReplyModal}>Close</Button>
                        </ModalHeader>

                        <ModalBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>TweetId</th>
                                        <th>Reply</th>
                                        <th>Time Published</th>
                                    </tr>
                                </thead>
                                {
                                    (filterReplies.map((reply, k) =>
                                        < tr >
                                            <td>{reply.username}</td>
                                            <td>{reply.replyContent}</td>
                                            <td>{reply.replyPostTime}</td>
                                        </tr>
                                    ))
                                }
                            </Table>
                        </ModalBody>
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default MyTweets