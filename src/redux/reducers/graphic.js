import { SUCCESS_SUFFIX } from './../sagas/helpers';
import {GET_PORTS, GET_RATES} from "./../helpers/constants";

const initialState = {
    ports: undefined,
    rates: [],
};

export default function appState(state = initialState, action) {
    switch (action.type) {
        case 'GET_TEST': {
            return state;
        }
        case `${GET_PORTS}${SUCCESS_SUFFIX}`: {
            return {
                ...state,
                ports: action.payload,
            };
        }
        case `${GET_RATES}`: {
            return {
                ...state,
                rates: []
            };
        }
        case `${GET_RATES}${SUCCESS_SUFFIX}`: {
            return {
                ...state,
                rates: action.payload,
            };
        }
        default:
            return state
        }
}