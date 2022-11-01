// import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell, CellTypes } from "../cell";

interface BundlesState {
    data: {
        [key: string]: Cell;
    }
}

const initialState: BundlesState = {
    data: {}
};

const reducer = (state: BundlesState=initialState, action: Action): BundlesState => {
    switch (action.type) {
        // case ActionType.BUNDLE_START:
        //     return state;
        // case ActionType.BUNDLE_COMPLETE:
        //     return state;
        default:
            return state;
    }
}

export default reducer;