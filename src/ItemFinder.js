"use strict";
const foundItems = [];
const Ajv = require('ajv');
const jsonFile = require('jsonfile')
const PostmanCollectionSchema = require('./Schemas/PostmanCollectionSchema.json');
const uuidV4 = require('uuid/v4');
const fs = require('fs');


const ItemFinder = function() {};

let _generatePostCampIds;
let _element;
let _collection;

ItemFinder.prototype.copyItems = function copyItems(testConfig, generatePostCampIds) {

    _generatePostCampIds = generatePostCampIds;
    let i = 0;
    testConfig.items.forEach(function (element) {

        _element = element;
        _collection = getCollectionFromOriginOrSavedIdFile();
        validateCollectionSchema();
        let item = findItemInCollection();

        if (item) {
            foundItems[i] = item;
            i++;
        }
        saveCollectionWithPostCampIdsIfNeeded();

    });
    return foundItems;
};

const getCollectionWithPostCampIds = function () {
    var postCampCollectionPath = _element.collection;
    postCampCollectionPath = postCampCollectionPath.replace('.json', '_withPostcampIds.json');
    return postCampCollectionPath;
};

const getCollectionFromOriginOrSavedIdFile = function () {
    var postCampCollectionPath = getCollectionWithPostCampIds();
    let collection;
    if(_generatePostCampIds && fs.existsSync(postCampCollectionPath))
    {
        collection = jsonFile.readFileSync(postCampCollectionPath);
    }
    else
    {
        collection = jsonFile.readFileSync(_element.collection);
    }
    return collection;
};

const findItemInCollection = function () {
    let item = null;
    if (currentElementHasAFolder()) {
        item = findElementWithFolderInCollection();
    }
    else {
        item = findElementByNameInObject(_element.requestName, _collection);
    }
    return item;
};

const saveCollectionWithPostCampIdsIfNeeded = function () {
    if(_generatePostCampIds)
    {
        var postCampCollectionPath = getCollectionWithPostCampIds();
        jsonFile.writeFileSync(postCampCollectionPath, _collection)
    }
};

const currentElementHasAFolder = function() {
    return _element.folder && _element.folder!=="";
};

const findElementWithFolderInCollection = function () {
    const folder = findElementByNameInObject(_element.folder, _collection);
    return findElementByNameInObject(_element.requestName, folder);
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


const validateCollectionSchema = function validateCollectionSchema() {
    const ajv = new Ajv({schemaId: 'auto'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

    const valid = ajv.validate(PostmanCollectionSchema, _collection);
    if (!valid) {
        console.log("Schema has errors:"+ajv.errorsText());
        throw new Error("Error, collection invalid:");
    }
};

module.exports = ItemFinder;