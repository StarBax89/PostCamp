"use strict";
const foundItems = [];
let _collection;
let _testConfig;
let _currentElement;

const ItemFinder = function(collection, testConfig) {
    _collection = collection;
    _testConfig = testConfig;
};

ItemFinder.prototype.findItems = function findItems() {

    let i = 0;
    _testConfig.items.forEach(function (element) {
        let item = null;
        _currentElement = element;

        if (currentElementHasAFolder()) {
            item = findElementWithFolderInCollection();
        }
        else {
            item = findElementByNameInObject(_currentElement.requestName, _collection);
        }

        if (item) {
            foundItems[i] = item;
            i++;
        }
    });
    return foundItems;
};

const currentElementHasAFolder = function() {
    return _currentElement.folder && _currentElement.folder!=="";
};

const findElementWithFolderInCollection = function () {
    const folder = findElementByNameInObject(_currentElement.folder, _collection);
    return findElementByNameInObject(_currentElement.requestName, folder);
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

module.exports = ItemFinder;