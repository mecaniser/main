import React from 'react'
const ActionButton = ({execute,actionName, status}) =>{
    return (
        <button onClick={execute}>{actionName}{status && status}</button>
    )
}
export default ActionButton