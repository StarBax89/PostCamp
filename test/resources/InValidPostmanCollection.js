var collection = {
    "info": {
        "name": "Elasticsearch",
        "_postman_id": "af43ca22-56d3-3846-69f7-219d7c9d82b5",
        "description": "",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "items": [
        {
            "name": "MatchAll",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"query\":{\n        \n        \"matchall\":{}\n    }\n}"
                },
                "url": {
                    "raw": "http://192.168.59.103:9200/_search",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "_search"
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "AddMovie",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"title\": \"The Godfather\",\n    \"director\": \"Francis Ford Coppola\",\n    \"year\": 1972,\n    \"genres\": [\"Crime\", \"Drama\"]\n}"
                },
                "url": {
                    "raw": "http://192.168.59.103:9200/movies/movie/",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "movies",
                        "movie",
                        ""
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "FullTextSearch",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"query\": {\n        \"query_string\": {\n            \"query\": \"kill\"\n        }\n    }\n}"
                },
                "url": {
                    "raw": "http://192.168.59.103:9200/_search",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "_search"
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "SearchInField",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"query\": {\n        \"query_string\": {\n            \"query\": \"ford\",\n            \"fields\": [\"title\"]\n        }\n    }\n}"
                },
                "url": {
                    "raw": "http://192.168.59.103:9200/_search",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "_search"
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "SearchFilter",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"query\": {\n        \"filtered\": {\n            \"query\": {\n                \"query_string\": {\n                    \"query\": \"drama\"\n                }\n            },\n            \"filter\": {\n                \"term\": { \n                    \"year\": 1962 \n                    \n                }\n           }\n        }\n    }\n}"
                },
                "url": {
                    "raw": "http://192.168.59.103:9200/_search",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "_search"
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "GetMapping",
            "request": {
                "method": "GET",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {},
                "url": {
                    "raw": "http://192.168.59.103:9200/movies/movie/_mapping",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "movies",
                        "movie",
                        "_mapping"
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "SetMapping",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n   \"movie\": {\n      \"properties\": {\n         \"director\": {\n            \"type\": \"multi_field\",\n            \"fields\": {\n                \"director\": {\"type\": \"string\"},\n                \"original\": {\"type\" : \"string\", \"index\" : \"not_analyzed\"}\n            }\n         }\n      }\n   }\n}"
                },
                "url": {
                    "raw": "http://192.168.59.103:9200/movies/movie/_mapping",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "movies",
                        "movie",
                        "_mapping"
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "SearchInWithFilter",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"query\": {\n        \"constant_score\": {\n            \"filter\": {\n                 \"term\": { \"director\": \"francis\" }\n            }\n        }\n    }\n}"
                },
                "url": {
                    "raw": "http://192.168.59.103:9200/_search",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "_search"
                    ]
                },
                "description": ""
            },
            "response": []
        },
        {
            "name": "SearchOriginalWithFilter",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"query\": {\n        \"constant_score\": {\n            \"filter\": {\n                 \"term\": { \"director.original\": \"Francis Ford Coppola\" }\n            }\n        }\n    }\n}"
                },
                "url": {
                    "raw": "http://192.168.59.103:9200/_search",
                    "protocol": "http",
                    "host": [
                        "192",
                        "168",
                        "59",
                        "103"
                    ],
                    "port": "9200",
                    "path": [
                        "_search"
                    ]
                },
                "description": ""
            },
            "response": []
        }
    ]
};

module.exports = collection;