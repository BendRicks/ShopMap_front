import { useEffect, useState } from "react";
import ShopPlate from "../components/ShopPlate";
import { ShopsContainer, UserPageContainer } from "./pages_elements";
import { useNavigate } from "react-router-dom";

export default function UserPage({ cookies }) {

    const url = process.env.REACT_APP_BACKEND_URL

    let [user, setUser] = useState({ id: '', username: '', email: '', creationTime: null, role: null, shops: [] })

    const navigate = useNavigate()

    useEffect(() => {
        let params = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${cookies['jwt_token']}`,
            },
        }
        fetch(`${url}/api/users/current`, params)
            .then((resp) => {
                if (resp.status == 401) {
                    navigate('/logout')
                }
                return resp.json()
            })
            .then((data) => {
                if (data.message) {
                    alert(data.message)
                } else {
                    setUser(data)
                }
            })
            .catch((err) => alert(err.message))

    }, [])

    return (
        <UserPageContainer>
            <p>Id: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email ? user.email : <a href="/create/email">Add email</a>}</p>
            <ShopsContainer>{user.shops?.map((shop) => <ShopPlate shop={shop} />)}</ShopsContainer>
        </UserPageContainer>
    )

}