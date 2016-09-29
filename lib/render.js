'use strict';

const ldUpdate = require('lodash.update');

module.exports = (subject, transformations, params) => {
    transformations.forEach((transformation) => {
        ldUpdate(subject, transformation.path, transformation.transformation.bind(null, params));
    });
    return subject;
};

