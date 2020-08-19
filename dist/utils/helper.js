"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearWhere = (where) => {
    const _where = {};
    const keys = Object.keys(where);
    keys.forEach(key => {
        const value = where[key];
        if (value) {
            _where[key] = value;
        }
    });
    return _where;
};
exports.default = {
    clearWhere: exports.clearWhere
};
