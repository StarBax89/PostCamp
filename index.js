#!/usr/bin/env node
"use strict";
const fs = require("fs");
const jsonFile = require('jsonfile')
const CollectionGenerator = require('./src/CollectionGenerator');
//var grunt = require('grunt-cli');
var newman = require('newman'),
    Promise = require('bluebird'),
    newmanRun = Promise.promisify(newman.run);

const startTestCollection = function(testConfiguration, output, newman) {
    //console.log("Starting testCollection:"+collection+" "+testConfiguration+" "+ output);

   // const collectionContent = jsonFile.readFileSync(collection);
    const testConfigContent = jsonFile.readFileSync(testConfiguration);

    const collectionGenerator = new CollectionGenerator();
    const testCollection = collectionGenerator.generateCollection(testConfigContent);

    const testCollectionString = JSON.stringify(testCollection);
    fs.writeFile(output, testCollectionString, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("Wrote testCollection to " + output);
    });
    console.log(JSON.stringify(testCollection));
    if(newman)
    {
        runNewman(output);
    }
};
const runNewman = function (collection) {
    newmanRun({
        collection: collection,
        reporters: 'cli'
    });
};

const argv = require('yargs')
    .command('create', 'Create the test collection',
        function(yargs) {
            return yargs
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
                })

                .option('newman',{
                    alias: 'n',
                    type: 'boolean',
                    demand: 'Please specify an output file',
                    nargs: 1,
                    describe: 'File to save new testcollection',
                    requiresArg:false,
                    default: false
                });
        },
        function (argv) {
            startTestCollection(argv.testconfiguration, argv.output, argv.newman);
        })

    .argv;


