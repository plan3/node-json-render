'use strict';
const ldUniq = require('lodash.uniq');
const isPlainObject = require('lodash.isplainobject');

function parse(regex, strValue) {
    const matched = strValue.match(regex);
    if (!matched || !matched.length) {
        return false;
    }
    if (matched.length === 1 && matched[0] === strValue) {
        return matched[0];
    }
    return ldUniq(matched);
}

function doScan(parseFn, subTemplate, path) {
    if (typeof subTemplate === 'string') {
        const matched = parseFn(subTemplate);
        if (matched) {
            return {
                path: path,
                matched
            };
        }
    } else if (Array.isArray(subTemplate) || isPlainObject(subTemplate)) {
        return [].concat.apply([], Object.keys(subTemplate)
            .map((key) => doScan(parseFn, subTemplate[key], path.concat(key))));
    }

    return [];
}

module.exports = function(template, regex) {
    if (!regex instanceof RegExp) {
        throw new TypeError('Second parameter should be of type RegExp');
    }
    return doScan(parse.bind(null, regex), template, []);
};
