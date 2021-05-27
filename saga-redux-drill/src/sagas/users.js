import { takeEvery, call, fork } from "redux-saga/effects";
import * as actions from "../actions/users";
import * as useApiTo from "../api/users";

// worker saga
function* getUsers() {
  try {
      const result = yield call(useApiTo.getUsers)
  } catch (error) {}
}

//saga watcher
function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

const usersSagas = [
    fork(watchGetUsersRequest)
]

export default usersSagas