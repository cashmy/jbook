import produce from 'immer';
import { ActionType } from "../action-types";
import { Action } from "../actions";
// import { Cell, CellTypes } from "../cell";

interface BundlesState {
    data: {
        [key: string]: {
            loading: boolean;
            code: string;
            err: string;
        }
    }
}

const initialState: BundlesState = {
    data: {}
};

const reducer = produce((state: BundlesState=initialState, action: Action): BundlesState => {
    switch (action.type) {
        case ActionType.BUNDLE_START:
            state.data[action.payload.cellId] = {
                loading: true,
                code: '',
                err: ''
            }
            return state;

        case ActionType.BUNDLE_COMPLETE:
            state.data[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err
            }
            return state;

        default:
            return state;
    }
}, initialState);

export default reducer;