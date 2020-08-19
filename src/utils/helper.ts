import {Store} from "./types";

export const clearWhere = (where: Store) => {
    const _where: Store = {};
    const keys = Object.keys(where);
    keys.forEach(key => {
        const value = where[key];
        if (value) {
            _where[key] = value;
        }
    });
    return _where;
}

export default {
    clearWhere
}