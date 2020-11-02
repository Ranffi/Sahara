
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from '../redux/store'
import { Link } from 'react-router-dom';
import Logout from './Logout'


class Sanduich extends Component{
    constructor(){
        super();
        this.state = {
            class: '',
            showList: 'show_user_menu'
        }
        this.addClass = this.addClass.bind(this)
    }
    addClass(){
        if (this.state.class !== 'change'){
            this.setState({class: 'change'})
            this.setState({showList: ''})
        } else {
            this.setState({class: ''})
            this.setState({showList: 'show_user_menu'})
        }
    }


    render(){
        return (
            <div>
                <div className={`navbar__btn ${this.state.class}`} onClick={() => this.addClass()}>
                    <div className="bar1" />
                    <div className="bar2" />
                    <div className="bar3" />
                </div>
                <div className={`user_menu ${this.state.showList}`}>
                    <h4>{this.props.user.firstName} {this.props.user.lastName}</h4>
                    <ul onClick={() => this.addClass()}><Link to="/settings">Settings</Link></ul>
                    <ul onClick={() => this.addClass()}>Order History</ul>
                    {
                        this.props.user.adminStatus ?
                        <ul><Link to="/admin" onClick={() => this.addClass()}>Admin</Link></ul> : ''
                    }
                    <Logout addClass={this.addClass} />
                </div>
            </div>
        )
    }
}

export default connect(
    ({user}) => {
        return {
            user
        }
    },
    (dispatch) => {
        return {
        }
    }
)(Sanduich)
