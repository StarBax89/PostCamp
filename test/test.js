"use strict";
var assert = require('assert');

var CollectionGenerator = require('../src/CollectionGenerator');
describe('CenarioCreator', function() {
    describe('#copyFromTo()', function() {


       it('should return error if TestConfigIsInvalid', function() {

            const testConfig = require('./resources/InValidTestConfig.json');
           testConfig.items[0].collection = './test/resources/ValidPostmanCollection.json';
           testConfig.items[1].collection = './test/resources/ValidPostmanCollection.json';
            //const collection = require('./resources/ValidPostmanCollection.json');
            const collectionGenerator = new CollectionGenerator();

            let errorThrown = false;
            try {
                collectionGenerator.generateCollection(/*collection, */testConfig);
            }
            catch(e) {
                errorThrown = true;
            }
            if(!errorThrown) {
                assert.fail("Error should be thrown");
            }
        });

        it('should return error if CollectionIsInvalid', function() {

            const testConfig = require('./resources/ValidTestConfig.json');
            testConfig.items[0].collection = './test/resources/InValidPostmanCollection.json';
            testConfig.items[1].collection = './test/resources/InValidPostmanCollection.json';
            //const collection = require('./resources/InValidPostmanCollection.json');
            const collectionGenerator = new CollectionGenerator();

            let errorThrown = false;
            try {
                collectionGenerator.generateCollection(/*collection, */testConfig);
            }
            catch(e) {
                errorThrown = true;
            }
            if(!errorThrown) {
                assert.fail("Error should be thrown");
            }
        });

        it('should return no error if everything is valid', function() {

            const testConfig = require('./resources/ValidTestConfig.json');
            testConfig.items[0].collection = './test/resources/ValidPostmanCollection.json';
            testConfig.items[1].collection = './test/resources/ValidPostmanCollection.json';
            //const collection = require('./resources/ValidPostmanCollection.json')
            const collectionGenerator = new CollectionGenerator();

            collectionGenerator.generateCollection(/*collection, */testConfig);

        });

        it('should return two requests', function() {

            const testConfig =
                {
                    "name": "collectionName",
                    "items": [{
                        "collection": "./test/resources/TestCollection.json",
                        "requestName": "Request1"
                    },
                        {
                            "collection": "./test/resources/TestCollection.json",
                            "requestName": "Request5"
                        }
                    ]
                };
            //const collection = require('./resources/TestCollection.json')
            const collectionGenerator = new CollectionGenerator();

            const testCollection = collectionGenerator.generateCollection(/*collection, */testConfig);

            console.log(JSON.stringify(testCollection));
            assert.equal(testCollection.item.length, 2);
        });


        it('should find requests in folders', function() {

            const testConfig =
                {
                    "name": "collectionName",
                    "items": [{
                        "collection" : "./test/resources/TestCollection.json",
                        "folder" : "Folder1",
                        "requestName" : "Request7"
                    },
                        {
                            "collection" : "./test/resources/TestCollection.json",
                            "folder" : "Folder2",
                            "requestName" : "Request8"
                        }
                    ]
                };
            //const collection = require('./resources/TestCollection.json')
            const collectionGenerator = new CollectionGenerator();

            const testCollection = collectionGenerator.generateCollection(/*collection, */testConfig);

            console.log(JSON.stringify(testCollection));
            assert.equal(testCollection.item.length, 2);
        });


    });
});