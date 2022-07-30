import { useLocation, useNavigate } from "react-router";
import SuccessBody from "./SuccessBody";
import Menu from "./NavBar"

export default function Success() {
    const location = useLocation();
    let navigate = useNavigate()
    console.log(location)
    if(!location.state){
        navigate('/')
    }
 
    return (
        <div>
            <Menu/>
            <SuccessBody props={{ state: { location } }} />
        </div>
    )
}