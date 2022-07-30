import { FaReplyd } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaReply, FaRedo, FaListUl, FaRegIdBadge } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { Button, Container, Col, Row, Card } from 'react-bootstrap'
import './../styles/SuccessBody.css'

export default function SuccessBody(props) {
    let location = useLocation();
    let navigate = useNavigate();
    console.log(location)

    const handleViewTweet = () => {
        navigate('/viewtweets', { state: { userName: location.state.userName, userId: location.state.userId } })
    }

    const handlePostTweet = () => {
        navigate('/posttweets', { state: { userName: location.state.userName, userId: location.state.userId } })
    }

    const handleViewReplies = () => {
        navigate('/viewreplies', { state: { userName: location.state.userName, userId: location.state.userId } })

    }

    const handleResetPassword = () => {
        navigate('/resetpassword', { state: { userName: location.state.userName, userId: location.state.userId } })
    }

    const handleMyTweets = () => {
        navigate('/mytweets', { state: { userName: location.state.userName, userId: location.state.userId } })
    }

    const handleTweetHistory = () => {
        navigate('/tweethistory', { state: { userName: location.state.userName, userId: location.state.userId } })
    }

    return (
        <div>
            <Container className='p-4'>
                <Row>
                    <Col>
                        <Card id="card">
                            <center>
                                <Card.Title id="title" className="bg-secondary text-white">View and reply to tweets</Card.Title>
                            </center>
                            <Card.Body>
                                <center>
                                    <Button variant="secondary" onClick={handleViewTweet}><FaReplyd size={50} /></Button>
                                </center>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card id="card">
                            <center>
                                <Card.Title id="title" className="bg-secondary text-white">Post Tweets</Card.Title>
                            </center>
                            <Card.Body>
                                <center>
                                    <Button variant="secondary" onClick={handlePostTweet}><FaTelegramPlane size={50} /></Button>
                                </center>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className='p-4'>
                <Row>
                    <Col>
                        <Card id="card">
                            <center>
                                <Card.Title id="title" className="bg-secondary text-white">View All Replies</Card.Title>
                            </center>
                            <Card.Body>
                                <center>
                                    <Button variant="secondary" onClick={handleViewReplies}><FaReply size={50} /></Button>
                                </center>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card id="card">
                            <center>
                                <Card.Title id="title" className="bg-secondary text-white">Reset Password</Card.Title>
                            </center>
                            <Card.Body>
                                <center>
                                    <Button variant="secondary" onClick={handleResetPassword}><FaRedo size={50} /></Button>
                                </center>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className='p-4'>
                <Row><Col>
                    <Card id="card">
                        <center>
                            <Card.Title id="title" className="bg-secondary text-white">My Tweets</Card.Title>
                        </center>
                        <Card.Body>
                            <center>
                                <Button variant="secondary" onClick={handleMyTweets}><FaListUl size={50} /></Button>
                            </center>
                        </Card.Body>
                    </Card>
                </Col>
                    <Col>
                        <Card id="card">
                            <center>
                                <Card.Title id="title" className="bg-secondary text-white">Tweet History of a User</Card.Title>
                            </center>
                            <Card.Body>
                                <center>
                                    <Button variant="secondary" onClick={handleTweetHistory}><FaRegIdBadge size={50} /></Button>
                                </center>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}