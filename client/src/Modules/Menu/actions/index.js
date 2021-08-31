
import * as actions from '../actionTypes';

import axios from 'axios';

import env from "../../../_env";

export const fetchNodes = (searchTerm) => {
    return {
        type: actions.FETCH_NODES,
        payload: new Promise(resolve => {
            axios.get(`${env.api}/nodetypes`)
                .then(response => {
                    return resolve(response)
                })
        })
    }
};
