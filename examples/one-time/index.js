'use strict';

const renderJson = require('../../index');
const template1 = require('./template1.json');
const template2 = require('./template2.json');

const commonParams = {
    object_whole: {
        key1: 'value1',
        key2: 2,
        key3: true
    },
    array_whole: ['value1', 2, true]
};

const params1 = {
    'whole': 'whole',
    'partial_start': 'partial_start',
    'partial_middle': 'partial_middle',
    'partial_end': 'partial_end',
    ' with spaces ': ' with spaces ',
    'multiple_1': 'multiple_1',
    'multiple_2': 'multiple_2',
    'repeated': 'repeated',
    'nested_1': 'nested_1',
    'nested_2': 'nested_2'
};

const params2 = {
    object_partial: 'object_partial',
    array_in_object: 'array_in_object',
    array_partial: 'array_partial',
    object_in_array: 'object_in_array',
    stringify_object: {
        key1: 'value1',
        key2: 2,
        key3: true
    },
    stringify_array: ['value1', 2, true]
};

const renderer = renderJson.oneTime;
const json1 = renderer(template1, Object.assign({}, commonParams, params1)); // eslint-disable-line no-unused-vars
const json2 = renderer(template2, Object.assign({}, commonParams, params2)); // eslint-disable-line no-unused-vars
