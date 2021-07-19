import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadTypeParticipantSuccess,
  loadTypeParticipantFailure,
} from "../actions/TypeParticipantActions";
import getTypeParticipant from "../../constant.config.api/api/getTypeParticipant";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

//
function* loadDataSaga() {
  try {
    const res = yield call(getTypeParticipant);
    yield put(loadTypeParticipantSuccess(res.data.data));

  } catch (error) {
    yield put(loadTypeParticipantFailure(error));
  }
}
const sagas = [
  takeLatest(actionTypes.LOAD_TYPE_PARTICIPANT, loadDataSaga),
];

export default sagas;
