import { Container, Table, Card, Button, Modal, ModalHeader, ModalBody, ModalTitle } from "react-bootstrap";
import { useEffect, useState, React } from "react";
import { useNavigate, useLocation } from "react-router";
import Menu from './NavBar'
import html2canvas from 'html2canvas';
import { FaUserSecret } from "react-icons/fa";
import jsPDF from 'jspdf';
import { url } from './url'

let tweets = []
let users = []
const TweetHistory = () => {
    let location = useLocation()
    let navigate = useNavigate()
    let [userTweets, setUserTweets] = useState(tweets);
    let [history, setHistory] = useState([]);
    const [modal, setModal] = useState(false)

    const handleClose = () => {
        setModal(false)
    }

    function fetchUsers() {
        console.log(location.state)
        fetch(`${url}/allTweets`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                userTweets = data
                setUserTweets(userTweets)
                userTweets.map(function (user, index) {
                    users.push(user.username)
                })
                let uniq = [...new Set(users)]
                users = uniq
                console.log(users)
            })
        console.log(userTweets)
    }

    function fetchTweetsOfUser(data) {
        fetch(`${url}/allTweetsOfUser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then((res) => { return res.json() })
            .then((data) => {
                console.log(data)
                history = data
                setHistory(history)
            })

    }

    function printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("tweet_history.pdf");
            })
    }

    function handleUserActivity(data) {
        setModal(true)
        fetchTweetsOfUser(data)
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <div>
            <Menu />
            {users.map(function (user, index) {
                return (
                    <Container>
                        <Card>
                            <Card.Body>
                                <>
                                    <FaUserSecret className='m-1' />
                                    <b className="title">{user}</b>
                                </><br /><br />
                                <Button variant="primary" onClick={(event) => handleUserActivity(user)}>View User Activity</Button>
                            </Card.Body>
                        </Card>
                    </Container>
                )
            })
            }

            <Modal show={modal} id="divToPrint">
                <ModalHeader>
                    <ModalTitle>Tweet History</ModalTitle>
                    <div>
                        <Button variant="secondary" onClick={printDocument}>Download</Button>{' '}
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>UserName</th>
                                <th>TweetId</th>
                                <th>Tweet Content</th>
                                <th>Time Published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.map(function (tweet, index) {
                                    return (
                                        <tr>
                                            <td>{tweet.username}</td>
                                            <td>{tweet.tweetId}</td>
                                            <td>{tweet.tweetContent}</td>
                                            <td>{tweet.postTime}</td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default TweetHistory