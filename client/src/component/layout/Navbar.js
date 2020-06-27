import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'

const Navbar = ({logout, auth :{isAuthenticated, loading}}) =>{

    const authLinks = (
        <ul>
            <li><Link to="/profiles">
            Devlopers</Link></li>
            <li><Link to="/posts">
            Posts</Link></li>
            
            <li><Link to="/dashboard">
            <i className="fas fa-user"></i>{''}
            <span className="hide-sm">Dashboard</span></Link></li>
            <li><a onClick={logout} href="#!">
                <i className="fas fa-sign-out-alt"></i>{''}
                <span className="hide-sm">Logout</span></a></li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">
            Devlopers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
        <div>
            <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> Connector</Link>
            </h1>
    { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
            </nav>
        </div>
    )
}

Navbar.propTypes = {
    logout : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProp = state =>({
    auth : state.auth
})

export default connect(mapStateToProp,{logout})(Navbar);