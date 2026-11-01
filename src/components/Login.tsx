import {useState} from "react";
import {useAppDispatch} from "../reducer/store.ts";
import {processError} from "../util/util.ts";
import type {LoginData} from "../data.ts";
import {getServr} from "../server/servr.ts";
import {loggedUser} from "../reducer/header.ts";


export const Login = () => {
    const dispatch = useAppDispatch()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const changeLogin = (e : any) => {
        setLogin(e.target.value)
    }

    const changePassword = (e: any) => {
        setPassword(e.target.value)
    }

    const triggerLogin = async () => {
        try {
            const loginData : LoginData = {
                login, password
            }

            const lgUser = await getServr().login(loginData)

            // login was ok, proceeding to the page with the transactions or whatever
            dispatch(loggedUser(lgUser))
        } catch(e: any) {
            processError(dispatch, e)
        }
    }

    return (
        <div className="container">
            <h1>Expense Tracker</h1>
            <h2>Sign in to your account</h2>

            <div className="form-group">
                <label htmlFor="login">Login</label>
                <input className="mbottom" type="text" id="login" name="login" placeholder="Enter your username" value={login} onChange={changeLogin}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={changePassword}/>

                <div className="login-button" onClick={triggerLogin}>Sign In</div>
            </div>
        </div>
    )
}
