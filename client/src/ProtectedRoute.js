import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "./request";

export default function ProtectedRoute(props){
    const [loggedin , setLoggedin] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        (async ()=>{
            const {status} = await request("http://localhost:5000/auth", {}, "POST")    
            console.log("from pr", status)
            if(status=='ok')   setLoggedin(true)
            if(status!='ok'){
                console.log("redirect to login from pr")
                navigate('/login')
            }
        })()
    },[])
    return loggedin?props.children:<p>Authenticating...</p>
}