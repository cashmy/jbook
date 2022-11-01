import { ActionType } from '../action-types';
import { Cell, CellTypes } from '../cell';
 
interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: 'up' | 'down';
    };
}

interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: string;
}

interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER;
    payload: {
        id: string | null;
        type: CellTypes;
    };
}

interface InsertCellBeforeAction { 
    type: ActionType.INSERT_CELL_BEFORE;
    payload: {
        id: string | null;
        type: CellTypes;
    };
}

interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    };
}

export type Action =
    | MoveCellAction
    | DeleteCellAction  
    | InsertCellAfterAction
    | InsertCellBeforeAction
    | UpdateCellAction;

