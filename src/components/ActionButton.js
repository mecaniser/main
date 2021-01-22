import React from "react";
const ActionButton = ({ execute, actionName }) => {
  return (
    <button onClick={execute}>
      {actionName}
    </button>
  );
};
export default ActionButton;
