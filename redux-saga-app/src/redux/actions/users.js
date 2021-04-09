import * as types from "../types";

export default function getUsers(users) {
  return { type: type.GET_USERS, payload: users };
}
