'use strict';

const defaultLeftDelimiter = '${';
const defaultRightDelimiter = '}';

function escapeRegExp(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function isStringOrUndefined(val) {
    return ['string', 'undefined'].indexOf(typeof val) !== -1;
}

function validateDelimiter(delimiter) {
    if (!isStringOrUndefined(delimiter)) {
        throw new TypeError('Delimiter must be string or undefined.');
    }
    return typeof delimiter === 'string' && delimiter;
}

function buildRegexpString(leftDelimiter, rightDelimiter) {
    const escapedLeftDelimiter = escapeRegExp(leftDelimiter);
    const escapedRightDelimiter = escapeRegExp(rightDelimiter);
    if (leftDelimiter === rightDelimiter) {
        return escapedLeftDelimiter + '(.+?)' + escapedRightDelimiter;
    }
    return escapedLeftDelimiter + '((?:(?!' + escapedLeftDelimiter + ').)+?)' + escapedRightDelimiter;
}

function build(leftDelimiter, rightDelimiter) {
    rightDelimiter = typeof rightDelimiter === 'undefined' ? leftDelimiter : rightDelimiter;
    const validDelimiters = {
        leftDelimiter: validateDelimiter(leftDelimiter) || defaultLeftDelimiter,
        rightDelimiter: validateDelimiter(rightDelimiter) || defaultRightDelimiter
    };
    const regexpStr = buildRegexpString(validDelimiters.leftDelimiter, validDelimiters.rightDelimiter);
    return Object.assign(new RegExp(regexpStr, 'g'), validDelimiters);
}

module.exports = build;
module.exports.default = build();
module.exports.defaultLeftDelimiter = defaultLeftDelimiter;
module.exports.defaultRightDelimiter = defaultRightDelimiter;

