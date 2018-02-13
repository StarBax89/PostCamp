# PostCamp
Create a test scenario (Collection) from different Postman Collections


1. ``` $ npm install -g ```

2. ``` $ postcamp create -t 'TestConfig.json' -o './out.json' ```
    
    
``` json

 {
   "name": "collectionName",
   "items": [
     {
       "collection": "TestCollection.postman_collection.json",
       "folder": "Folder1",
       "requestName": "Request7"
     },
     {
       "collection": "TestCollection.postman_collection.json",
       "folder": "Folder2",
       "requestName": "Request8"
     }
   ]
 }

 
```


Schemas generated with 
https://www.liquid-technologies.com/online-json-to-schema-converter


Known issues:

- Multiple requests with same name
- Multiple folders with same name
- No error message if folder is not found (cannot find item of null) 
- ~~Naming of out collection not working~~
