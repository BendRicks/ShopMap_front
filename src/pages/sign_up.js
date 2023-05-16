import { useEffect, useState } from "react"
import { SignUpContainer, TextInput, PasswordInput, SubmitInput } from "./pages_elements"
import { useNavigate } from "react-router-dom"

export default function SignUp({ setCookie, setAuthorized }) {

    const url = process.env.REACT_APP_BACKEND_URL

    let [login, setLogin] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [passwordRep, setPasswordRep] = useState('')
    let [regButtonPressed, regLogButtonPressed] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (regButtonPressed) {
            let data = {
                username: login,
                email: email,
                password: password,
                passwordRepeat: passwordRep
            }
            let params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
            fetch(`${url}/api/auth/register`, params)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    if (data.message) {
                        alert(data.message)
                    } else {
                        let expires = new Date()
                        expires.setTime(expires.getTime() + 60000 * 120)
                        setCookie('jwt_token', data.token, { path: '/', expires })
                        setAuthorized(data.authoritiesResponse)
                        navigate('/')
                    }
                })
        }
        regLogButtonPressed(false)
    }, [regButtonPressed])


    function handleOnSubmit(event) {
        event.preventDefault()
        regLogButtonPressed(true)
    }

    return (<>
        <SignUpContainer onSubmit={handleOnSubmit}>
            <label>Login</label>
            <TextInput type="text" placeholder="login" onChange={e => setLogin(e.target.value)} value={login} required/>
            <label>Email</label>
            <TextInput type="text" placeholder="email" onChange={e => setEmail(e.target.value)} value={email} required/>
            <label>Password</label>
            <PasswordInput type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} required/>
            <label>Repeat Password</label>
            <PasswordInput type="password" placeholder="repeat password" onChange={e => setPasswordRep(e.target.value)} value={passwordRep} required/>
            <SubmitInput type="submit" value="Sign Up" />
        </SignUpContainer>
        <p>Choose your login and email properly! You will not be able to change it after signing up!</p>
    </>
    )
}