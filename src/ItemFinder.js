"use strict";
const foundItems = [];
const Ajv = require('ajv');
const jsonFile = require('jsonfile')
const PostmanCollectionSchema = require('./Schemas/PostmanCollectionSchema.json');
const uuidV4 = require('uuid/v4');

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
        //console.log("new coll:"+JSON.stringify(_collection));

        jsonFile.writeFileSync(element.collection, _collection)
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


            if(collectionItem.hasOwnProperty('request')) {
                var request = collectionItem.request;
                if (request.hasOwnProperty('request')) {

                    if(request.description.indexOf("{\"#postcampId\"") === -1)
                    {
                        request.description = collectionItem.description.concat("\n{\"#postcampId\":\""+uuidV4()+"\"}");
                    }
                }
                else {
                    request.description = "\n{\"#postcampId\":\""+uuidV4()+"\"}";
                }
            }
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
        console.log("Schema has errors:"+ajv.errorsText());
        throw new Error("Error, collection invalid:");
    }
};

module.exports = ItemFinder;