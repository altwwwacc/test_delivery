import { createAction } from 'redux-actions';
import { createEmitActions } from 'redux-saga-helpers';
import { take, put } from 'redux-saga/effects';

export const SUCCESS_SUFFIX = '_SUCCESS';
export const FAILED_SUFFIX = '_FAILED';

export const createEmitter = ({ type, payload, meta }) => {
    const successAction = createAction(`${type}${SUCCESS_SUFFIX}`, null, () => ({ ...payload, initialAction: meta }));
    const errorAction = createAction(`${type}${FAILED_SUFFIX}`, null, () => ({ ...payload, initialAction: meta }));
    return createEmitActions(successAction, errorAction);
};

export function* putAsync(action) {
    yield put(action);
    yield take(({ type }) => type === `${action.type}${SUCCESS_SUFFIX}` || type === `${action.type}${FAILED_SUFFIX}`);
}