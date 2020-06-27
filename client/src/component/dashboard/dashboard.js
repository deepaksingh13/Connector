import React,{ useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import auth from '../../reducers/auth'
import { Link } from 'react-router-dom'

import DashboardAction from './dashboardAction'
import Experience from './Experience'
import Education from './Education'


const Dashboard = ({getCurrentProfile,deleteAccount,auth : {user},profile : {profile,loading}}) =>{

    useEffect(() =>{
        getCurrentProfile();
    },[getCurrentProfile]);

    return loading && profile === null ? <Spinner/> : 
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name}
        </p>
        { profile !== null ? 
            <Fragment>
                <DashboardAction/>    
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>

                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        Delete My Account
                    </button>
                </div>
            </Fragment> : 
            <Fragment> 
                <p>You have not yet created Profile</p>    
                <Link to="/createProfile" className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired,
    deleteAccount : PropTypes.func.isRequired
}

const mapStateToProp = state =>({
    auth : state.auth,
    profile : state.profile
});

export default connect(mapStateToProp,{ getCurrentProfile, deleteAccount })(Dashboard);