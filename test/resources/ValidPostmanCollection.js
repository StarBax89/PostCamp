var collection = {
    "variables": [],
    "info": {
        "name": "PDM-DeviceTypes-API",
        "_postman_id": "84840231-d489-a7bf-b76c-3ef6c2b21e9d",
        "description": "",
        "schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
    },
    "item": [
        {
            "name": "[Token] [service]",
            "event": [
                {
                    "listen": "test",
                    "script": {
                        "type": "text/javascript",
                        "exec": [
                            "var jsonData = JSON.parse(responseBody);\r",
                            "postman.setEnvironmentVariable(\"token\", jsonData.access_token);\r",
                            ""
                        ]
                    }
                }
            ],
            "request": {
                "url": "https://login.microsoftonline.com/DTQPRM.onmicrosoft.com/oauth2/token",
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/x-www-form-urlencoded",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "urlencoded",
                    "urlencoded": [
                        {
                            "key": "grant_type",
                            "value": "client_credentials",
                            "type": "text"
                        },
                        {
                            "key": "client_id",
                            "value": "{{aad.clientId}}",
                            "type": "text"
                        },
                        {
                            "key": "client_secret",
                            "value": "{{aad.clientSecret}}",
                            "type": "text"
                        },
                        {
                            "key": "resource",
                            "value": "{{aad.resource}}",
                            "type": "text"
                        }
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[Token] [user]",
            "event": [
                {
                    "listen": "test",
                    "script": {
                        "type": "text/javascript",
                        "exec": [
                            "var jsonData = JSON.parse(responseBody);\r",
                            "postman.setEnvironmentVariable(\"token\", jsonData.access_token);"
                        ]
                    }
                }
            ],
            "request": {
                "url": "https://login.microsoftonline.com/DTQPRM.onmicrosoft.com/oauth2/token",
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/x-www-form-urlencoded",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "urlencoded",
                    "urlencoded": [
                        {
                            "key": "resource",
                            "value": "{{aad.resource}}",
                            "description": "",
                            "type": "text"
                        },
                        {
                            "key": "client_id",
                            "value": "{{aad.clientId}}",
                            "description": "",
                            "type": "text"
                        },
                        {
                            "key": "grant_type",
                            "value": "password",
                            "description": "",
                            "type": "text"
                        },
                        {
                            "key": "username",
                            "value": "{{username}}",
                            "description": "",
                            "type": "text"
                        },
                        {
                            "key": "password",
                            "value": "{{password}}",
                            "description": "",
                            "type": "text"
                        },
                        {
                            "key": "scope",
                            "value": "openid",
                            "description": "",
                            "type": "text"
                        },
                        {
                            "key": "client_secret",
                            "value": "{{aad.clientSecret}}",
                            "description": "",
                            "type": "text"
                        }
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] GET devicetypes",
            "request": {
                "url": "{{url}}/devicetypes",
                "method": "GET",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": ""
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] GET devicetypes?tenantId={tid}",
            "request": {
                "url": {
                    "raw": "{{url}}/devicetypes?tenantId=T00000001",
                    "host": [
                        "{{url}}"
                    ],
                    "path": [
                        "devicetypes"
                    ],
                    "query": [
                        {
                            "key": "tenantId",
                            "value": "T00000001",
                            "equals": true,
                            "description": ""
                        }
                    ],
                    "variable": []
                },
                "method": "GET",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": ""
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] POST devicetypes",
            "request": {
                "url": "{{url}}/devicetypes",
                "method": "POST",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\r\n  \"deviceTypeId\": \"{{deviceTypeId}}\",\r\n  \"displayName\": \"Machine Simulator T2\",\r\n  \"tenantId\": \"{{tenantId}}\",\r\n  \"deviceTemplate\": {\r\n    \"deviceProperties\": {\r\n      \"manufacturer\": \"string\"\r\n    },\r\n    \"systemProperties\": {},\r\n    \"commands\": {},\r\n    \"metadata\": {\r\n      \"namespaces\": [\r\n        \"string\"\r\n      ],\r\n      \"fields\": [\r\n        {\r\n          \"nodeID\": \"ns=0;active\",\r\n          \"valueRank\": -1,\r\n          \"dataType\": 1,\r\n          \"minimum\": 0,\r\n          \"maximum\": 1\r\n        }\r\n      ]\r\n    }\r\n  },\r\n  \"rulesTrigger\": [ {\r\n      \"displayName\": \"string;active\",\r\n      \"name\": \"active\",\r\n      \"unit\": \"Unit\"\r\n    }]\r\n}"
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] GET devicetypes/{id}",
            "request": {
                "url": "{{url}}/devicetypes/{{deviceTypeId}}",
                "method": "GET",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": ""
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] GET devicetypes/{id}?tenantId={tid}",
            "request": {
                "url": {
                    "raw": "{{url}}/devicetypes/{{deviceTypeId}}?tenantId={{tenantId}}",
                    "host": [
                        "{{url}}"
                    ],
                    "path": [
                        "devicetypes",
                        "{{deviceTypeId}}"
                    ],
                    "query": [
                        {
                            "key": "tenantId",
                            "value": "{{tenantId}}",
                            "equals": true,
                            "description": ""
                        }
                    ],
                    "variable": []
                },
                "method": "GET",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": ""
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] GET devicetypes/{id}?tenantId=D0000001",
            "request": {
                "url": {
                    "raw": "{{url}}/devicetypes/{{deviceTypeId}}?tenantId=T0000001",
                    "host": [
                        "{{url}}"
                    ],
                    "path": [
                        "devicetypes",
                        "{{deviceTypeId}}"
                    ],
                    "query": [
                        {
                            "key": "tenantId",
                            "value": "T0000001",
                            "equals": true,
                            "description": ""
                        }
                    ],
                    "variable": []
                },
                "method": "GET",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": ""
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] PUT devicetypes/{id}",
            "request": {
                "url": "{{url}}/devicetypes/{{deviceTypeId}}",
                "method": "PUT",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\r\n  \"version\" : 2,\r\n  \"deviceTypeId\": \"{{deviceTypeId}}\",\r\n  \"displayName\": \"Machine Simulator\",\r\n  \"tenantId\": \"{{tenantId}}\",\r\n  \"deviceTemplate\": {\r\n    \"deviceProperties\": {\r\n      \"manufacturer\": \"string\"\r\n    },\r\n    \"systemProperties\": {},\r\n    \"commands\": {},\r\n    \"metadata\": {\r\n      \"namespaces\": [\r\n        \"string\"\r\n      ],\r\n      \"fields\": [\r\n        {\r\n          \"nodeID\": \"ns=0;active\",\r\n          \"valueRank\": -1,\r\n          \"dataType\": 1,\r\n          \"minimum\": 0,\r\n          \"maximum\": 1\r\n        }\r\n      ]\r\n    }\r\n  },\r\n  \"rulesTrigger\": [\r\n  \t {\r\n      \"displayName\": \"active\",\r\n      \"name\": \"string;active\",\r\n      \"unit\": \"Other Unit\"\r\n    }\r\n  ]\r\n}"
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] DELETE devicetypes/{id}",
            "request": {
                "url": "{{url}}/devicetypes/{{deviceTypeId}}",
                "method": "DELETE",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\r\n  \"deviceTypeId\": \"machine-sim-123\",\r\n  \"displayName\": \"Machine Simulator\",\r\n  \"tenantId\": \"T00000001\",\r\n  \"deviceTemplate\": {\r\n    \"deviceProperties\": {\r\n      \"manufacturer\": \"string\"\r\n    },\r\n    \"systemProperties\": {},\r\n    \"commands\": {},\r\n    \"metadata\": {\r\n      \"namespaces\": [\r\n        \"string\"\r\n      ],\r\n      \"fields\": [\r\n        {\r\n          \"nodeID\": \"ns=0;active\",\r\n          \"valueRank\": -1,\r\n          \"dataType\": 1,\r\n          \"minimum\": 0,\r\n          \"maximum\": 1\r\n        }\r\n      ]\r\n    }\r\n  },\r\n  \"rulesTrigger\": {\r\n    \"displayName\": \"ns=0;active\",\r\n    \"name\": \"active\",\r\n    \"unit\": \"\"\r\n  }\r\n}"
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[DeviceTypes] DELETE devicetypes/{id}?tenantId=(tid)",
            "request": {
                "url": {
                    "raw": "{{url}}/devicetypes/{{deviceTypeId}}?tenantId={{tenantId}}",
                    "host": [
                        "{{url}}"
                    ],
                    "path": [
                        "devicetypes",
                        "{{deviceTypeId}}"
                    ],
                    "query": [
                        {
                            "key": "tenantId",
                            "value": "{{tenantId}}",
                            "equals": true,
                            "description": ""
                        }
                    ],
                    "variable": []
                },
                "method": "DELETE",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\r\n  \"devddddiceTypeId\": \"machine-sim-123\",\r\n  \"displayName\": \"Machine Simulator\",\r\n  \"tenantId\": \"T00000001\",\r\n  \"deviceTemplate\": {\r\n    \"deviceProperties\": {\r\n      \"manufacturer\": \"string\"\r\n    },\r\n    \"systemProperties\": {},\r\n    \"commands\": {},\r\n    \"metadata\": {\r\n      \"namespaces\": [\r\n        \"string\"\r\n      ],\r\n      \"fields\": [\r\n        {\r\n          \"nodeID\": \"ns=0;active\",\r\n          \"valueRank\": -1,\r\n          \"dataType\": 1,\r\n          \"minimum\": 0,\r\n          \"maximum\": 1\r\n        }\r\n      ]\r\n    }\r\n  },\r\n  \"rulesTrigger\": {\r\n    \"displayName\": \"ns=0;active\",\r\n    \"name\": \"active\",\r\n    \"unit\": \"\"\r\n  }\r\n}"
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "[Devices API] register device",
            "request": {
                "url": "{{url}}/tenants/{{tenantId}}/deviceRegistrations/",
                "method": "POST",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{token}}",
                        "description": ""
                    },
                    {
                        "key": "Content-Type",
                        "value": "application/json",
                        "description": ""
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{ \n \"deviceId\": \"demoDTdeviceT2\",\n \"iccId\": null,\n \"deviceType\": \"{{deviceTypeId}}}\",\n \"manufacturer\": \"\",\n \"serialNumber\": null,\n \"imei\": null,\n \"additionalProperties\": {\n   \"presharedKey\": null\n }\n}"
                },
                "description": ""
            },
            "response": []
        }
    ]
};

module.exports = collection;