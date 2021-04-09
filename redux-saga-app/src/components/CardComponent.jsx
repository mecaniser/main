import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.user.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.user.company.name}</h6>
        <h5 className="card-title">{props.user.company.catchPhrase}</h5>
      </div>
    </div>
  );
};

export default Card;
