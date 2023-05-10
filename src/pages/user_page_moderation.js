import { useEffect, useState } from "react";
import ShopPlate from "../components/ShopPlate";
import { ShopsContainer, UserPageContainer } from "./pages_elements";
import { useNavigate, useParams } from "react-router-dom";

export default function UserPageModeration({ cookies, authorization }) {

    let { id } = useParams()

    let [user, setUser] = useState({ id: '', username: '', email: '', creationTime: null, role: null, shops: [] })
    let [status, setStatus] = useState()
    let [role, setRole] = useState()
    let [statusChanged, setStatusChanged] = useState(false)
    let [roleChanged, setRoleChanged] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        let params = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${cookies['jwt_token']}`,
            },
        }
        fetch(`http://localhost:8080/api/users/${id}`, params)
            .then((resp) => {
                if (resp.status == 401) {
                    navigate('/logout')
                }
                return resp.json()
            })
            .then((data) => {
                if (data.message) {
                    alert(data.message)
                    navigate('/users')
                } else {
                    setUser(data)
                    setStatus(data.acco)
                }
            })
            .catch((err) => {
                alert(err.message)
                navigate('/users')
            })

    }, [])

    useEffect(() => {
        if (statusChanged) {
            let params = {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${cookies['jwt_token']}`
                },
            }
            fetch(`http://localhost:8080/api/users/${id}/status/${status}`, params)
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.message || data.error) {
                        alert(data.message)
                        setStatus(user.status)
                    }
                })
            setStatusChanged(false)
        }
    }, [statusChanged])

    useEffect(() => {
        if (roleChanged) {
            let params = {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${cookies['jwt_token']}`
                },
            }
            fetch(`http://localhost:8080/api/users/${id}/role/${role}`, params)
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.message || data.error) {
                        alert(data.message)
                        setStatus(user.role)
                    }
                })
            setRoleChanged(false)
        }
    }, [roleChanged])

    function changeRole(newRole){
        setRole(newRole)
        setStatusChanged(true)
    }

    function changeStatus(newStatus){
        setStatus(newStatus)
        setStatusChanged(true)
    }

    return (
        <UserPageContainer>
            {authorization.userRole === "ROLE_ADMIN" ? <div>Role: {user.role} <button onClick={() => changeRole('ROLE_MODERATOR')}>Moderator</button> <button onClick={() => changeRole('ROLE_ADMIN')}>User</button></div> : <></>}
            <div><button>Verify</button><button>Ban</button></div>
            <p>Id: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email ? user.email : <a href="/create/email">Add email</a>}</p>
            <ShopsContainer>{user.shops?.map((shop) => <ShopPlate shop={shop} />)}</ShopsContainer>
        </UserPageContainer>
    )

}