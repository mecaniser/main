import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const UsersList = ({ users }) => {
  console.log(users);
  if (users) {
    return (
      <ListGroup>
        {users.map((user) => {
          return <ListGroupItem key={user.id}>{user.firstName}</ListGroupItem>;
        })}
      </ListGroup>
    );
  }else {
      return <h1>No user data found</h1>
  }
};

export default UsersList;
