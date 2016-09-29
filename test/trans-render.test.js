'use strict';

const chai = require('chai');
chai.should();

const transformation = require('../lib/transformation');
const render = require('../lib/render');

describe('transformation and render', function() {
    it('Should pass the test', function() {
        const testData = require('./data/trans-render/different');
        const transformations = transformation(testData.matched, '{', '}');
        transformations.length.should.equal(testData.matched.length);
        const output = render(testData.template, transformations, testData.params);
        output.should.eql(testData.output);
    });
});
