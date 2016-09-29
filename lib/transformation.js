'use strict';

function prepareTrasformation(entry, trimDelimitersFn) {
    const replaceFn = (Array.isArray(entry.matched)) ? replaceParts : replaceWhole;
    return {
        path: entry.path,
        transformation: replaceFn.bind(null, entry.matched, trimDelimitersFn)
    };
}

function replaceWhole(matched, trimDelimitersFn, params, value) {
    const property = trimDelimitersFn(matched);
    if (params.hasOwnProperty(property)) {
        return params[property];
    }
    return value;
}

function replaceParts(matched, trimDelimitersFn, params, value) {
    return matched.reduce((newValue, match) => {
        const property = trimDelimitersFn(match);
        if (params.hasOwnProperty(property)) {
            let param = params[property];
            if (typeof param !== 'string') {
                param = JSON.stringify(param);
            }
            return newValue.split(match).join(param);
        }
        return newValue;
    }, value);
}

function trimDelimiters(left, right, str) {
    return str.slice(left.length, -right.length);
}

module.exports = (matched, leftDelimiter, rightDelimiter) => {
    const boundTrimDelimiters = trimDelimiters.bind(null, leftDelimiter, rightDelimiter);
    return matched
        .filter((entry) => Array.isArray(entry.matched) || typeof entry.matched === 'string')
        .map((entry) => prepareTrasformation(entry, boundTrimDelimiters));
};
