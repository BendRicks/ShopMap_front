import './App.css'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Shops from './pages/shops'
import NotFound from './pages/not_found';
import Main from './pages/main';
import SignIn from './pages/sign_in';
import { MainContainer } from './pages/pages_elements';
import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie'
import { AdminNavbar, GuestNavbar, ModeratorNavbar, UserNavbar } from './components/Navbar';
import CreateShop from './pages/create_shop';
import Logout from './pages/logout';
import UserPage from './pages/user_page';
import ShopsModeration from './pages/shops_moderation';
import Shop from './pages/shop';
import ChangeShop from './pages/change_shop';
import SignUp from './pages/sign_up';
import UserPageModeration from './pages/user_page_moderation';


export default function App() {

  const url = process.env.REACT_APP_BACKEND_URL

  const [cookies, setCookie] = useCookies(['jwt_token'])
  let [authorized, setAuthorized] = useState({userId: null, userRole: null})
  let firstLoaded = true

  useEffect(() => {
    if (firstLoaded) {
      firstLoaded = false
      let params = {
        method: "GET",
        credentials: 'include',
        headers: {
          "Authorization": `Bearer ${cookies['jwt_token']}`,
        },
      }
      fetch(`${url}/api/users/current/authorities`, params)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.userId && data.userRole){
          setAuthorized(data)
        }
      })
    }
  }, [])

  function authorizationNavbar(){
    switch (authorized.userRole){
      case 'ROLE_ADMIN': return (<AdminNavbar setCookie={setCookie}/>)
      case 'ROLE_MODERATOR': return (<ModeratorNavbar setCookie={setCookie}/>)
      case 'ROLE_USER': return (<UserNavbar setCookie={setCookie}/>)
      default: return (<GuestNavbar/>)
    }
  }

  return (
    <Router>
      {authorizationNavbar()}
      <MainContainer>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/shops/moderation" element={<ShopsModeration cookies={cookies}/>}/>
        <Route path="/shops" element={<Shops/>}/>
        <Route path="/shop/create" element={<CreateShop cookies={cookies}/>}/>
        <Route path="/shop/:id" element={<Shop cookies={cookies} authorization={authorized}/>}/>
        <Route path="/shop/:id/change" element={<ChangeShop cookies={cookies}/>}/>
        <Route path="/sign-in" element={<SignIn setCookie={setCookie} setAuthorized={setAuthorized}/>}/>
        <Route path="/sign-up" element={<SignUp setCookie={setCookie} setAuthorized={setAuthorized}/>}/>
        <Route path="/logout" element={<Logout setCookie={setCookie} setAuthorized={setAuthorized}/>}/>
        <Route path="/account" element={<UserPage cookies={cookies}/>}/>
        <Route path="/user/:id" element={<UserPageModeration cookies={cookies} authorization={authorized}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </MainContainer>
    </Router>
  )
}