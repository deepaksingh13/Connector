import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'

const Login = ({login,isAuthenticated}) =>{

    const [fromData,setFormData] = useState({
        email : '',
        password : ''
    });

    const {email,password} = fromData;

    const onChange = e => setFormData({...fromData,[e.target.name] : e.target.value});

    const onSubmit = async(e) =>{
        e.preventDefault();
        console.log(fromData);
        login(email,password);
    }


    // Redirect if Logged in

    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return (
        <div>
             <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={e =>onSubmit(e)}>
                <div className="form-group">
                <input type="email" placeholder="Email Address" required name="email" value={email} onChange={e =>onChange(e)} />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password} onChange={e =>onChange(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            </section>
        </div>
    )
}

Login.propTypes = {
    login : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool
}

const mapStateToProp = state =>({
    isAuthenticated : state.auth.isAuthenticated
})


export default connect(mapStateToProp,{login})(Login);