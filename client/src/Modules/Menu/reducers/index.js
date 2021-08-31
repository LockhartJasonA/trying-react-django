import * as actions from '../actionTypes';

import tableColumnsFromNodes from "../../../Functions/tableColumnsFromNodes";

const initialState = {
    loadingNodes: true,
    nodes: [],
    tables: []
};

export default function (state = initialState, action) {
    let out = state;

    switch (action.type) {

        case actions.FETCH_NODES_PENDING:
            out = Object.assign({}, out, {
                loadingNodes: true,
            });
            break;

        case actions.FETCH_NODES_FULFILLED:
            out = Object.assign({}, out, {
                loadingNodes: false,
                nodes: action.payload.data,
                tables: tableColumnsFromNodes(action.payload.data)
            });
            break;

        default:
            // no default case
            break;
    }

    return out;
}
