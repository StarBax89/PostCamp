
"use strict";
var Ajv = require('ajv');
var TestConfigSchema = require('./Schemas/TestConfigSchema.json');
var PostmanCollectionSchema = require('./Schemas/PostmanCollectionSchema.json');

var CollectionGenerator = function() {};

CollectionGenerator.prototype.generateCollection = function (collection, testConfig) {

    validateTestConfigSchema(testConfig);
    validateCollectionSchema(collection);

    var testCollection = {
        "info": {

            "description": "",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        "item": []
    };
    var i = 0;
    testConfig.items.forEach(function (element) {
        //console.log("ItemToFind :"+element.requestName);
        var item = findElementInCollection(element, collection);
        //console.log(JSON.stringify(item));
        testCollection.item[i] = item;

        i++;
    });
    testCollection.name = testConfig.name;
    return testCollection;

}

function validateCollectionSchema(collection) {
    var ajv = new Ajv({schemaId: 'auto'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

    var valid = ajv.validate(PostmanCollectionSchema, collection);
    if (!valid) {
        //console.log(ajv.errors);
        throw new Error("Error, collection invalid:");
    }
}

function validateTestConfigSchema(testConfig) {
    var ajv = new Ajv({schemaId: 'auto'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

    var valid = ajv.validate(TestConfigSchema, testConfig);
    if (!valid) {
        //console.log(ajv.errors);
        throw new Error("Error, testConfig invalid");
    }
}

var findElementInCollection = function (elementToFind, collection) {

    var foundElement;
    collection.item.some(function (element) {
        //console.log("etf:"+elementToFind.requestName+" elem:"+element.name);
        if (elementToFind.requestName === element.name) {
            //console.log("FOUND");
            //console.log(JSON.stringify(element));
            foundElement = element;
            return true;
        }
    });
    //console.log("huhu");
    return foundElement;
}

module.exports = CollectionGenerator;