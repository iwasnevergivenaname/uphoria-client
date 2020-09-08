import React, {useState, useEffect} from "react"
import {
	Switch,
	Route,
} from "react-router-dom"
import "../styles/App.css"
import BottomNav from "./BottomNav"
import jwt_decode from "jwt-decode"
import {AUTH_TOKEN} from "../auth/constant"
import Video from "./Video"
import Profile from "./Profile/Profile"
import Auth from "./Auth/Auth"
import Logout from "./Logout/Logout"

const App = () => {
	let [currentUser, setCurrentUser] = useState("")

	useEffect(() => {
		let token
		if (!localStorage.getItem(AUTH_TOKEN)) {
			//Do something later
		} else {
			token = jwt_decode(localStorage.getItem(AUTH_TOKEN))
			console.log("DECODING PROCESS:", token)
			setCurrentUser(token)
		}
	}, [])

	const nowCurrentUser = (userData) => {
		console.log("New Current User Set:", userData)
		setCurrentUser(userData)
	}

	const handleLogout = () => {
		if (localStorage.getItem(AUTH_TOKEN)) {
			localStorage.removeItem(AUTH_TOKEN)
			setCurrentUser(null)
		}
	}

	return (
		<div className="App">
			<Logout handleLogout={handleLogout}/>
			<Switch>
				<Route exact path="/" component={Video}/>
				<Route path="/auth" render={(props) => <Auth {...props} nowCurrentUser={nowCurrentUser}
				                                            user={currentUser}/>}/>
				<Route path="/profile" render={(props) => <Profile {...props} user={currentUser}/>}/>
				{/*<Route path="/create" component={Create} />*/}
			</Switch>
			<BottomNav/>
		</div>
	)
}

export default App
