# PostCamp
Create a test scenario (Collection) from different Postman Collections


1. ``` $ npm install -g ```

2. ``` $ postcamp create -c './TestCollection.postman_collection.json' -t 'TestConfig.json' -o './out.json' ```
    
    
``` json

 {
 	"name": "NAME_Wird_spaeter_name_der_test_collection",
 	"items": [{
 			"collection": "name der collection aus der der request entnommen wird",
 			"requestName": "name des_requests"
 		},
 		{
 			"collection": "name der collection aus der der request entnommen wird #2",
 			"folder" : "name des folders in der collection",
 			"requestName": "name des_requests #2"
 		}
 	]
 }
 
```


Schemas generated with 
https://www.liquid-technologies.com/online-json-to-schema-converter


Known issues:

- Multiple requests with same name
- Multiple folders with same name
