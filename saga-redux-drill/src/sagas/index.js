import { all } from "@redux-saga/core/effects";
import UsersSagas from "./users";

export default function* rootSaga() {
  yield all([...UsersSagas]);
}
