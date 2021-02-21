import {
    // eslint-disable-next-line
    call, takeLatest, take, select, put, takeEvery, all,
} from 'redux-saga/effects';
import { createAction } from 'redux-actions';
// eslint-disable-next-line
import { createEmitter, SUCCESS_SUFFIX } from './../sagas/helpers';
import {GET_PORTS, GET_RATES} from "./../helpers/constants";
import {apiGetPorts, apiGetRates} from "./../helpers/requests";

export const getPorts = createAction(GET_PORTS);
export const getRates = createAction(GET_RATES);




export function* LOADING(isLoading) {
    yield put({
        type: 'LOADING',
        payload: isLoading,
    })
}
export function* root() {

    yield takeLatest(GET_PORTS, function* (action) {
        yield call(
            createEmitter(action)(() => apiGetPorts()),
            action.payload,
        );
    });

    yield takeLatest(GET_RATES, function* (action) {
        const { origin,destination } = action.payload;
        if(!origin || !destination) return;
        yield call(
            createEmitter(action)(() => apiGetRates({origin,destination})),
            action.payload,
        );
    });

}


