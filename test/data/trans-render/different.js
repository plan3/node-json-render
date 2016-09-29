'use strict';
/* eslint-disable quote-props */

const template = {
    whole: '{whole}',
    object_whole: '{object_whole}',
    array_whole: '{array_whole}',
    partial_start: '{partial_start} should be replaced',
    partial_middle: 'This {partial_middle} should be replaced',
    partial_end: 'Should replace {partial_end}',
    ' with spaces ': 'Should replace also { with spaces }',
    multiple: 'Should replace {multiple_1} and {multiple_2}',
    repeated: 'Should replace this {repeated} and that {repeated}. The {repeated} also.',
    nested: 'Should {replace {most {nested_1}} & {nested_2}} only',
    object: {
        object_whole: '{object_whole}',
        object_partial: 'This is {object_partial} replacement',
        array_in_object: [
            'Search in {array_in_object}'
        ]

    },
    array: [
        'Lookup array',
        '{array_whole}',
        'Find {array_partial} too',
        {
            object_in_array: 'Replace on {object_in_array} too'
        }
    ],
    stringify: {
        object: '{stringify_object} as part',
        array: '{stringify_array} as part'
    },
    no_replacement: 'There should be |no_replacement}'
};

const matched = [
    {path: ['whole'], matched: '{whole}'},
    {path: ['object_whole'], matched: '{object_whole}'},
    {path: ['array_whole'], matched: '{array_whole}'},
    {path: ['partial_start'], matched: ['{partial_start}']},
    {path: ['partial_middle'], matched: ['{partial_middle}']},
    {path: ['partial_end'], matched: ['{partial_end}']},
    {path: [' with spaces '], matched: ['{ with spaces }']},
    {path: ['multiple'], matched: ['{multiple_1}', '{multiple_2}']},
    {path: ['repeated'], matched: ['{repeated}']},
    {path: ['nested'], matched: ['{nested_1}', '{nested_2}']},
    {path: ['object', 'object_whole'], matched: '{object_whole}'},
    {path: ['object', 'object_partial'], matched: ['{object_partial}']},
    {path: ['object', 'array_in_object', '0'], matched: ['{array_in_object}']},
    {path: ['array', '1'], matched: '{array_whole}'},
    {path: ['array', '2'], matched: ['{array_partial}']},
    {path: ['array', '3', 'object_in_array'], matched: ['{object_in_array}']},
    {path: ['stringify', 'object'], matched: ['{stringify_object}']},
    {path: ['stringify', 'array'], matched: ['{stringify_array}']}
];

const params = {
    whole: 'whole',
    object_whole: {
        key1: 'value1',
        key2: 2,
        key3: true
    },
    array_whole: ['value1', 2, true],
    partial_start: 'partial_start',
    partial_middle: 'partial_middle',
    partial_end: 'partial_end',
    ' with spaces ': ' with spaces ',
    multiple_1: 'multiple_1',
    multiple_2: 'multiple_2',
    repeated: 'repeated',
    nested_1: 'nested_1',
    nested_2: 'nested_2',
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

const output = {
    whole: 'whole',
    object_whole: params.object_whole,
    array_whole: params.array_whole,
    partial_start: 'partial_start should be replaced',
    partial_middle: 'This partial_middle should be replaced',
    partial_end: 'Should replace partial_end',
    ' with spaces ': 'Should replace also  with spaces ',
    multiple: 'Should replace multiple_1 and multiple_2',
    repeated: 'Should replace this repeated and that repeated. The repeated also.',
    nested: 'Should {replace {most nested_1} & nested_2} only',
    object: {
        object_whole: params.object_whole,
        object_partial: 'This is object_partial replacement',
        array_in_object: [
            'Search in array_in_object'
        ]
    },
    array: [
        'Lookup array',
        params.array_whole,
        'Find array_partial too',
        {
            object_in_array: 'Replace on object_in_array too'
        }
    ],
    stringify: {
        object: `${JSON.stringify(params.stringify_object)} as part`,
        array: `${JSON.stringify(params.stringify_array)} as part`
    },
    no_replacement: 'There should be |no_replacement}'
};

module.exports = {
    template,
    matched,
    params,
    output
};
