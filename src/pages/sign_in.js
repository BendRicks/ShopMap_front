import { useEffect, useState } from "react"
import { LoginContainer, TextInput, PasswordInput, SubmitInput } from "./pages_elements"
import { useNavigate } from "react-router-dom"

export default function SignIn({setCookie, setAuthorized}){

    let [login, setLogin] = useState('')
    let [password, setPassword] = useState('')
    let [logButtonPressed, setLogButtonPressed] = useState(false)

    const navigate = useNavigate()

        useEffect(() => {
            if (logButtonPressed) {
            if (login === '' || password === ''){
                alert("Login and password must not be empty")
            } else {
                let data = {
                    username: login,
                    password: password
                }
                let params = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
                fetch('http://localhost:8080/api/auth/login', params)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    if (data.message){
                        alert(data.message)
                    } else {
                        let expires = new Date()
                        expires.setTime(expires.getTime() + 60000*120)
                        setCookie('jwt_token', data.token, {path: '/', expires})
                        setAuthorized(data.authoritiesResponse)
                        navigate('/')
                    }
                })
            }
            }
            setLogButtonPressed(false)
        }, [logButtonPressed])
    
    
    
    function handleLoginChange(event){
        setLogin(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handleOnSubmit(event){
        event.preventDefault()
        setLogButtonPressed(true)
    }

    return (
        <LoginContainer onSubmit={handleOnSubmit}>
            <label>Login</label>
            <TextInput type="text" placeholder="login" onChange={e => handleLoginChange(e)} value={login} required/>
            <label>Password</label>
            <PasswordInput type="password" placeholder="password" onChange={e => handlePasswordChange(e)} value={password} required/>
            <SubmitInput type="submit" value="Login"/>
        </LoginContainer>
    )
}