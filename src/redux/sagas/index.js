import { all, fork } from 'redux-saga/effects';
import { root as graphic } from './../actions/graphic';

export default function* root() {
    yield all([
        fork(graphic),
    ]);
}