import React, {
    useState,
    useContext
} from 'react';
import PropTypes from 'prop-types'
import TodoContext from '../context/ToDoContext';


import './ToDoItem.css';


const useInput = () => {
    const [value, setValue] = useState('');

    return {
        bind: {
            value,
            type: 'text',
            placeholder: 'Add new task...',
            className: 'inputField',
            onChange: evt => setValue(evt.target.value)
        },
        clear: () => setValue(''),
        getValue: () => value
    }
}

const AddToDoItem = () => {

    const { onCreate } = useContext(TodoContext);

    const input = useInput()

    const submitHandler = evt => {
        evt.preventDefault()
        input.getValue().trim() && onCreate(input.getValue(), input.clear())
    
    }
    return (
        <form onSubmit={submitHandler}>
            <input {...input.bind} />
            <button className='addBtn' id="addItem" type='submit'> &#x0002B; </button>
        </form>
    )
}

AddToDoItem.protoTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddToDoItem