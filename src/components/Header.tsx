import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../reducer/store.ts";
import {filterExpiredErrors} from "../reducer/header.ts";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(filterExpiredErrors())
        }, 500)

        return () => clearInterval(interval)
    }, [])

    const logout = (e: any) => {
        e.preventDefault()

        // TODO
    }

    const transactions = (e: any) => {
        e.preventDefault()

        // TODO
    }

    const groups = (e: any) => {
        e.preventDefault()

        // TODO
    }

    const reports = (e: any) => {
        e.preventDefault()

        // TODO
    }

    const upload = (e: any) => {
        e.preventDefault()

        // TODO
    }

    const cash = (e: any) => {
        e.preventDefault()

        // TODO
    }

    const errors = useAppSelector((store) => store.header.errors)
    const hasErrors = errors?.length > 0

    const loggedUser = useAppSelector((store) => store.header.loggedUser)
    const isLogged = loggedUser !== null
    let loginMessage = 'not logged in'

    if (isLogged) {
        loginMessage = `${loggedUser.name} (${loggedUser.login})`
    }

    return (
        <>
            <header className="header">
                <div className="header-content">
                    <div className="header-top">
                        <button className={`menu-toggle${menuOpen ? ' active' : ''}`} id="menuToggle" onClick={() => setMenuOpen(!menuOpen)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="logo"></div>
                    </div>
                    <nav className={`menu${menuOpen ? ' active' : ''}`} id="menu">
                        {
                            isLogged && <ul onClick={() => setMenuOpen(false)}>
                            <li><a href="#" onClick={logout}>Logout</a></li>
                            <li><a href="#" onClick={transactions}>Transactions</a></li>
                            <li><a href="#" onClick={groups}>Groups</a></li>
                            <li><a href="#" onClick={reports}>Reports</a></li>
                            <li><a href="#" onClick={upload}>Upload CSV</a></li>
                            <li><a href="#" onClick={cash}>Cash</a></li>
                        </ul>
                        }
                    </nav>
                </div>
                <div className="user">{loginMessage}</div>
            </header>
            {hasErrors && <div className="error">
                {errors.map(error => error.message).map((msg, index) => <div key={index}>{msg}</div>)}
            </div>}
        </>
    );
}
