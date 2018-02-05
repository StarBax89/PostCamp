var assert = require('assert');

var TestConfigSchema = require('../src/Schemas/TestConfigSchema');
var PostmanCollectionSchema = require('../src/Schemas/PostmanCollectionSchema');
var Ajv = require('ajv');
describe('CenarioCreator', function() {
    describe('#copyFromTo()', function() {




        it('should return json with new collection', function() {
            assert.equal(1,1);

            var ajv = new Ajv({schemaId: 'auto'});
            // If you want to use both draft-04 and draft-06/07 schemas:
            // var ajv = new Ajv({schemaId: 'auto'});
            ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

            var testConfig = require('./resources/ValidTestConfig')

            var collection = require('./resources/ValidPostmanCollection')


            var valid = ajv.validate(TestConfigSchema, testConfig);
            if (!valid) console.log(ajv.errors);

            valid = ajv.validate(PostmanCollectionSchema, collection);
            if (!valid) console.log(ajv.errors);

        });



    });
});