import React, { Component, Fragment } from 'react';
import Map from './../../components/Map'
import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as UserActions } from './../../store/ducks/users'

const Main = ({ users }) => (
    <Map users={users} addUserRequest={UserActions.addUserRequest} />
)

const mapStateToProps = state => ({
    users: state.data
})

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)