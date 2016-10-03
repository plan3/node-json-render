'use strict';

const chai = require('chai');
chai.should();

const transformation = require('../lib/transformation');
const render = require('../lib/render');

const params = {
    whole: 'whole',
    object: {
        key1: 'value1',
        key2: 2,
        key3: true
    },
    array: ['value1', 2, true],
    variable: 'variable',
    nested_1: 'nested_1',
    nested_2: 'nested_2'
};

function testStingle(template, matched, expected) {
    const transformations = transformation(matched, '{', '}');
    transformations.length.should.equal(matched.length);
    const output = render(template, transformations, params);
    output.should.eql(expected);
}

describe('transformation and render', function() {
    it('Should replace whole strings', function() {
        const template = {
            whole: '{whole}',
            object_whole: '{object}',
            array_whole: '{array}',
            object: {
                object_whole: '{object}',
            },
            array: [
                '{array}',
            ]
        };
        const matched = [
            {path: ['whole'], matched: '{whole}'},
            {path: ['object_whole'], matched: '{object}'},
            {path: ['array_whole'], matched: '{array}'},
            {path: ['object', 'object_whole'], matched: '{object}'},
            {path: ['array', '0'], matched: '{array}'}
        ];
        const expected = {
            whole: 'whole',
            object_whole: params.object,
            array_whole: params.array,
            object: {
                object_whole: params.object,
            },
            array: [
                params.array,
            ]
        };

        testStingle(template, matched, expected);
    });

    it('Should replace all occurrences of variable', function() {
        const template = {
            value: '{variable} should be replaced. {variable} should be replaced and also {variable}'
        };

        const matched = [
            {path: ['value'], matched: ['{variable}']}
        ];

        const expected = {
            value: 'variable should be replaced. variable should be replaced and also variable',
        };

        testStingle(template, matched, expected);
    });

    it('Should replace nested variables', function() {
        const template = {
            nested: 'Should {replace {most {nested_1}} & {nested_2}} only'
        };

        const matched = [
            {path: ['nested'], matched: ['{nested_1}', '{nested_2}']}
        ];

        const expected = {
            nested: 'Should {replace {most nested_1} & nested_2} only'
        };

        testStingle(template, matched, expected);
    });

    it('Should serialize variables inside string', function() {
        const template = {
            object: '{object} as part',
            array: '{array} as part'
        };

        const matched = [
            {path: ['object'], matched: ['{object}']},
            {path: ['array'], matched: ['{array}']}
        ];

        const expected = {
            object: `${JSON.stringify(params.object)} as part`,
            array: `${JSON.stringify(params.array)} as part`
        };

        testStingle(template, matched, expected);
    });
});
