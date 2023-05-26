// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from "react-router-dom";
export class Navbar extends Component {
    render() {
        let { chk, toggleDarkMode,mode } = this.props
        return (
            <>
                {/* <nav className="navbar navbar-expand-lg bg-body-tertiary"> */}
                <nav className={`navbar sticky-top navbar-expand-lg navbar-${mode} bg-${mode}`}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">GetNews</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Business">Business</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Entertainment">Entertainment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Health">Health</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Science">Science</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Sports">Sports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Technology">Technology</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="form-check form-switch"> */}
                        <div className={`form-check form-switch text-${mode==='light'?'dark':'light'}`}>
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleDarkMode} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{chk} Dark Mode</label>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Navbar