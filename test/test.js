var assert = require('assert');

var CollectionGenerator = require('../src/CollectionGenerator');
describe('CenarioCreator', function() {
    describe('#copyFromTo()', function() {


       it('should return error if TestConfigIsInvalid', function() {

            var testConfig = require('./resources/InValidTestConfig.json');
            var collection = require('./resources/ValidPostmanCollection.json');
            var collectionGenerator = new CollectionGenerator();

            var errorThrown = false;
            try {
                collectionGenerator.generateCollection(collection, testConfig);
            }
            catch(e) {
                errorThrown = true;
            }
            if(!errorThrown) {
                assert.fail("Error should be thrown");
            }
        });

        it('should return error if CollectionIsInvalid', function() {

            var testConfig = require('./resources/ValidTestConfig.json');
            var collection = require('./resources/InValidPostmanCollection.json');
            var collectionGenerator = new CollectionGenerator();

            var errorThrown = false;
            try {
                collectionGenerator.generateCollection(collection, testConfig);
            }
            catch(e) {
                errorThrown = true;
            }
            if(!errorThrown) {
                assert.fail("Error should be thrown");
            }
        });

        it('should return no error if everything is valid', function() {

            var testConfig = require('./resources/ValidTestConfig.json')
            var collection = require('./resources/ValidPostmanCollection.json')
            var collectionGenerator = new CollectionGenerator();

            collectionGenerator.generateCollection(collection, testConfig);

        });

        it('should return two requests', function() {

            var testConfig =
                {
                    "name": "collectionName",
                    "items": [{
                        "collection": "TestCollection",
                        "requestName": "Request1"
                    },
                        {
                            "collection": "TestCollection",
                            "requestName": "Request5"
                        }
                    ]
                };
            var collection = require('./resources/TestCollection.json')
            var collectionGenerator = new CollectionGenerator();

            var testCollection = collectionGenerator.generateCollection(collection, testConfig);

            console.log(JSON.stringify(testCollection));
            assert.equal(testCollection.item.length, 2);
        });


        it('should find requests in folders', function() {

            var testConfig =
                {
                    "name": "collectionName",
                    "items": [{
                        "collection" : "TestCollection",
                        "folder" : "Folder1",
                        "requestName" : "Request7"
                    },
                        {
                            "collection" : "TestCollection",
                            "folder" : "Folder2",
                            "requestName" : "Request8"
                        }
                    ]
                };
            var collection = require('./resources/TestCollection.json')
            var collectionGenerator = new CollectionGenerator();

            var testCollection = collectionGenerator.generateCollection(collection, testConfig);

            console.log(JSON.stringify(testCollection));
            assert.equal(testCollection.item.length, 2);
        });


    });
});