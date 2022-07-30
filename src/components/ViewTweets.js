import { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Table, ModalHeader, ModalBody, ModalFooter, ModalTitle, Form } from "react-bootstrap";
import Menu from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ViewTweets.css"
import {   FaUserSecret } from "react-icons/fa";
import { url } from './url'

let tweets = []
let dummy = []
export default function ViewTweets(props) {
    const [userTweets, setUserTweets] = useState(tweets);
    const [replyButton, setReplyButton] = useState(false)
    const [replyContent, setReplyContent] = useState('')
    const [tweetindex, setTweetIndex] = useState('')
    const [postReplies, setPostReplies] = useState(dummy)
    let [filterReplies, setFilterReplies] = useState([])
    const [viewReplyModal, setViewReplyModal] = useState(false)

    let replies = []
    let location = useLocation()
    let navigate = useNavigate()
    const [disable, setDisable] = useState(false)
    const [value, setValue] = useState('Like')
    const handleClose = () => setReplyButton(false);
    const handleReplyModal = () => setViewReplyModal(false);

    // fetching all tweets
    const fetchUserTweets = () => {
        console.log(location.state)
        fetch(`${url}/allTweets`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setUserTweets(data)
            })
    }

    // fetching all user's replies
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

    // called when update button is clicked
    function updateTweet(data) {
        console.log(data.username + " " + location.state.userName)
        if (data.username === location.state.userName)
            navigate('/updatetweet', { state: { tweet: data, userId: location.state.userId, userName: location.state.userName } })
        else
            alert('Sorry,You cannot update this tweet as you are not the user who tweeted this!!')
    }

    // called when delete button is clicked
    function deleteTweet(data) {
        console.log(data.username + " " + location.state.userName)
        if (data.username === location.state.userName)
            navigate('/deletetweet', { state: { tweet: data, userId: location.state.userId, userName: location.state.userName } })
        else
            alert('Sorry,You cannot delete this tweet as you are not the user who tweeted this!!')
    }

    // data to be set onclick of reply button
    function replyTweet(data) {
        setTweetIndex(data)
        setReplyButton(true)
    }

    // called when reply button is clicked
    function postReply() {
        console.log(replyContent)
        fetch(`${url}/replyTweet`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tweetid: tweetindex,
                username: location.state.userName,
                tweetreply: replyContent
            })
        }).then(() => {
            alert('posted ur reply')
            setReplyButton(false)
            navigate('/success', { state: { userId: location.state.userId, userName: location.state.userName } })
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

    // like a user tweet
    function handleLike(data) {
        console.log(data)
        setTweetIndex(data)
        fetch(`${url}/likeTweet/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: data,
                username: location.state.userName
            })
        }).then((response) => {
            const json = response.json()
            // console.log(response.status)
            if (response.status === 200) {
                setValue('Liked')
                setDisable(true)
                alert("Liked a tweet with " + data)
                navigate('/success', { state: { userId: location.state.userId, userName: location.state.userName } })
            }
            else {
                alert('could not like your tweet, please try again!')
            }
        })
    }

    // called when the component is rendered
    useEffect(() => {
        fetchUserTweets()
        fetchUserReplies()
    }, []);

    return (
        <div>
            <Menu />
            <div>
                <Container>
                    {userTweets.map(function (tweet, index) {
                        return (
                            <Card className="card">
                                <Card.Body>
                                <FaUserSecret className='m-1' />
                                    <b className="title">{tweet.username}</b>
                                    <Card.Text key={index}>{tweet.tweetContent}</Card.Text>
                                    <Button className="button" variant="outline-success text-dark" onClick={(event) => replyTweet(tweet.tweetId)}>Reply</Button>{" "}
                                    <Button className="button" variant="outline-warning text-dark" onClick={(event) => updateTweet(tweet)}>Update</Button>{' '}
                                    <Button variant="outline-danger text-dark" onClick={(event) => deleteTweet(tweet)}>Delete</Button>{' '}
                                    {tweet.likedUsers.includes(location.state.userName) === true &&
                                        <Button className="like" disabled>Liked</Button>}
                                    {tweet.likedUsers.includes(location.state.userName) === false &&
                                        <Button className="like" onClick={(event) => handleLike(tweet.tweetId)} disabled={disable}>{value}</Button>}
                                    <div></div>
                                    <Card.Link variant="outline-secondary" onClick={(event) => viewPostReplies(tweet.tweetId)}>View replies</Card.Link>
                                </Card.Body>
                                <Card.Footer>Tweet Post Time :{tweet.postTime}</Card.Footer>
                            </Card>
                        )
                    })}

                    <Modal show={replyButton} id="divToPrint">
                        <ModalHeader>
                            <ModalTitle>Reply to the tweet</ModalTitle>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className='p-2'>Enter Your Reply</Form.Label>
                                    <Form.Control className='p-2' type="text" name="newReply" placeholder="Enter reply" onChange={e => setReplyContent(e.target.value)}></Form.Control>
                                </Form.Group>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' onClick={postReply}>Post Reply</Button>
                        </ModalFooter>
                    </Modal>

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
        </div >
    )
}
