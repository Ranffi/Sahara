
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from '../redux/store'

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
                    <ul>test</ul>
                    <ul>test</ul>
                    <ul>test</ul>
                    <ul>test</ul>
                </div>
            </div>
        )
    }
}

export default connect(
    () => {
        return {
        }
    },
    (dispatch) => {
        return {

        }
    }
)(Sanduich)
