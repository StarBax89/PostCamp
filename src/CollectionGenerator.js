"use strict";
const Ajv = require('ajv');
const TestConfigSchema = require('./Schemas/TestConfigSchema.json');
const ItemFinder = require('./ItemFinder');
const CollectionGenerator = function() {};

CollectionGenerator.prototype.generateCollection = function (/*collection, */testConfig) {

    validateTestConfigSchema(testConfig);

    const testCollection = {
        "info": {

            "description": "",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        "item": []
    };
    const itemFinder = new ItemFinder();
    testCollection.item = itemFinder.copyItems(testConfig, true);
    testCollection.info.name = testConfig.name;
    return testCollection;
};

const validateTestConfigSchema = function (testConfig) {
    const ajv = new Ajv({schemaId: 'auto'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

    const valid = ajv.validate(TestConfigSchema, testConfig);
    if (!valid) {
        throw new Error("Error, testConfig invalid");
    }
};



module.exports = CollectionGenerator;