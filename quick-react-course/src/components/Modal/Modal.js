import React, { Component } from 'react';
import './Modal.css'

export default class Modal extends Component {
    state = {
        isOpen: false
    }

    render() {
        const onModalAction = () => {
            this.setState(prevState => ({
                isOpen: !prevState.isOpen
              }));
        }
        return this.state.isOpen ?
            <>
                <div className="modal">
                    <div className="modal-body">
                        <button onClick={onModalAction} className="modal-close"> &times; </button>
                        <p>You've created this Awesome Modal that can be opened and closed by a button</p>
                    </div>
                </div>
            </>
            : <button onClick={onModalAction}>Open Modal</button>
    }
}