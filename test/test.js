var assert = require('assert');

var CollectionGenerator = require('../src/CollectionGenerator');
describe('CenarioCreator', function() {
    describe('#copyFromTo()', function() {


       it('should return error if TestConfigIsInvalid', function() {

            var testConfig = require('./resources/InValidTestConfig')
            var collection = require('./resources/ValidPostmanCollection')
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

            var testConfig = require('./resources/ValidTestConfig')
            var collection = require('./resources/InValidPostmanCollection')
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

            var testConfig = require('./resources/ValidTestConfig')
            var collection = require('./resources/ValidPostmanCollection')
            var collectionGenerator = new CollectionGenerator();

            collectionGenerator.generateCollection(collection, testConfig);

        });

    });
});