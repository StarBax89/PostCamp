#!/usr/bin/env node

const fs = require("fs");
const jsonFile = require('jsonfile')
const CollectionGenerator = require('./src/CollectionGenerator');

const startTestCollection = function(collection, testConfiguration, output) {
    //console.log("Starting testCollection:"+collection+" "+testConfiguration+" "+ output);

    const collectionContent = jsonFile.readFileSync(collection);
    const testConfigContent = jsonFile.readFileSync(testConfiguration);

    const collectionGenerator = new CollectionGenerator();
    const testCollection = collectionGenerator.generateCollection(collectionContent, testConfigContent);

    const testCollectionString = JSON.stringify(testCollection);
    fs.writeFile(output, testCollectionString, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("Wrote testCollection to " + output);
    });
};

const argv = require('yargs')
    .command('testCollection', 'Create the test collection',
        function(yargs) {
            return yargs
                .option('collection', {
                    alias: 'c',
                    type: 'string',
                    demand: 'Please specify collection file',
                    nargs: 1,
                    describe: 'File of postman collection',
                    requiresArg:true
            })
                .option('testconfiguration',{
                    alias: 't',
                    type: 'string',
                    demand: 'Please specify a testconfiguration file',
                    nargs: 1,
                    describe: 'File of testconfiguration',
                    requiresArg:true
            })
                .option('output',{
                    alias: 'o',
                    type: 'string',
                    demand: 'Please specify an output file',
                    nargs: 1,
                    describe: 'File to save new testcollection',
                    requiresArg:true
                });
        },
        function (argv) {
            startTestCollection(argv.collection, argv.testconfiguration, argv.output);
        })

    .argv;


