import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Logout({setCookie, setAuthorized}){
    
    const navigate = useNavigate()

    useEffect(() => {
        let expires = new Date()
        expires.setTime(expires.getTime())
        setCookie('jwt_token', '', {path: '/', expires})
        setAuthorized(false)
        navigate('/')
    })

    return (<h1>Log out</h1>)

}