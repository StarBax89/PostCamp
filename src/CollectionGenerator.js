
"use strict";
var Ajv = require('ajv');
var TestConfigSchema = require('../src/Schemas/TestConfigSchema');
var PostmanCollectionSchema = require('../src/Schemas/PostmanCollectionSchema');

var CollectionGenerator = function() {}

CollectionGenerator.prototype.generateCollection = function (collection, testConfig) {

    validateTestConfigSchema(testConfig);
    validateCollectionSchema(collection);
    return "Whatever";

}

function validateCollectionSchema(collection) {
    var ajv = new Ajv({schemaId: 'auto'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

    var valid = ajv.validate(PostmanCollectionSchema, collection);
    if (!valid) {
        console.log(ajv.errors);
        throw new Error("Error, collection invalid:");
    }
}

function validateTestConfigSchema(testConfig) {
    var ajv = new Ajv({schemaId: 'auto'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

    var valid = ajv.validate(TestConfigSchema, testConfig);
    if (!valid) {
        console.log(ajv.errors);
        throw new Error("Error, testConfig invalid");
    }
}

module.exports = CollectionGenerator;