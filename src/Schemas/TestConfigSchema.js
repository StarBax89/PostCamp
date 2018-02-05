var schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "items": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "collection": {
                            "type": "string"
                        },
                        "requestName": {
                            "type": "string"
                        },
                        "asdf": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "collection",
                        "requestName",
                        "asdf"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "collection": {
                            "type": "string"
                        },
                        "requestName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "collection",
                        "requestName"
                    ]
                }
            ]
        }
    },
    "required": [
        "name",
        "items"
    ]
};

module.exports = schema;