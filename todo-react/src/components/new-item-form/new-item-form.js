import React, { Component } from 'react';

export default class NewItemForm extends Component {
    state= {
        label: ""
    }
    render() {
        return(
            <div className="new-item-form">
                <input type='text' placeholder="Need to do something else?"></input>
            </div>
        )
    }
}