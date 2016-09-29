'use strict';

const defaultLeftDelimiter = '${';
const defaultRightDelimiter = '}';

function escapeRegExp(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function isStringOrUndefined(val) {
    return ['string', 'undefined'].indexOf(typeof val) !== -1;
}

function build(leftDelimiter, rightDelimiter) {
    rightDelimiter = typeof rightDelimiter === 'undefined' ? leftDelimiter : rightDelimiter;
    if (!isStringOrUndefined(leftDelimiter) || !isStringOrUndefined(rightDelimiter)) {
        throw new TypeError('Only strings and undefined ');
    }
    leftDelimiter = typeof leftDelimiter === 'string' && leftDelimiter || defaultLeftDelimiter;
    rightDelimiter = typeof rightDelimiter === 'string' && rightDelimiter || defaultRightDelimiter;
    const delimiters = {
        leftDelimiter,
        rightDelimiter
    };
    leftDelimiter = escapeRegExp(leftDelimiter);
    rightDelimiter = escapeRegExp(rightDelimiter);
    const result = (leftDelimiter === rightDelimiter) ?
        new RegExp(leftDelimiter + '(.+?)' + rightDelimiter, 'g') :
        new RegExp(leftDelimiter + '((?:(?!' + leftDelimiter + ').)+?)' + rightDelimiter, 'g');
    return Object.assign(result, delimiters);
}

module.exports = build;
module.exports.default = build();
module.exports.defaultLeftDelimiter = defaultLeftDelimiter;
module.exports.defaultRightDelimiter = defaultRightDelimiter;

