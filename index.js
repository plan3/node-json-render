'use strict';

const scan = require('./lib/scan');
const regexBuild = require('./lib/regex');
const transformation = require('./lib/transformation');
const render = require('./lib/render');

const oneTime = (template, params, leftDelimiter, rightDelimiter) => {
    const stringified = (typeof template === 'string') ? template : JSON.stringify(template);
    const subject = JSON.parse(stringified);
    const regex = regexBuild(leftDelimiter, rightDelimiter);
    const matched = scan(subject, regex);
    const transformations = transformation(matched, regex.leftDelimiter, regex.rightDelimiter);
    return render(subject, transformations, params);
};

module.exports = (commonParams, leftDelimiter, rightDelimiter) => (template, params) => {
    return oneTime(template, Object.assign({}, commonParams, params), leftDelimiter, rightDelimiter);
};

module.exports.oneTime = oneTime;
