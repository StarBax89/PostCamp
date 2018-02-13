"use strict";
const foundItems = [];
//let _testConfig;
//let _currentElement;
const Ajv = require('ajv');
const jsonFile = require('jsonfile')
const PostmanCollectionSchema = require('./Schemas/PostmanCollectionSchema.json');


const ItemFinder = function() {};

ItemFinder.prototype.findItems = function findItems(testConfig) {

    let i = 0;
    testConfig.items.forEach(function (element) {
        let item = null;
        let currentElement = element;
        console.log("element col:"+element.collection);

        let _collection = jsonFile.readFileSync(element.collection);
        console.log("colX:"+_collection);
        validateCollectionSchema(_collection);

        if (currentElementHasAFolder(currentElement)) {
            item = findElementWithFolderInCollection(_collection, currentElement);
        }
        else {
            item = findElementByNameInObject(currentElement.requestName, _collection);
        }

        if (item) {
            foundItems[i] = item;
            i++;
        }
    });
    return foundItems;
};

const currentElementHasAFolder = function(currentElement) {
    return currentElement.folder && currentElement.folder!=="";
};

const findElementWithFolderInCollection = function (collection, currentElement) {
    console.log("col:"+collection);
    const folder = findElementByNameInObject(currentElement.folder, collection);
    return findElementByNameInObject(currentElement.requestName, folder);
};

const findElementByNameInObject = function (elementName, objectToSearchIn) {
    let foundElement = null;
    objectToSearchIn.item.some(function (collectionItem) {
        if (elementName === collectionItem.name) {
            foundElement = collectionItem;
            return true;
        }
    });
    return foundElement;
};


const validateCollectionSchema = function validateCollectionSchema(collection) {
    const ajv = new Ajv({schemaId: 'auto'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

    const valid = ajv.validate(PostmanCollectionSchema, collection);
    if (!valid) {
        throw new Error("Error, collection invalid:");
    }
};

module.exports = ItemFinder;