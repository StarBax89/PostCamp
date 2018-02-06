var PostmanCollectionSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "https://schema.getpostman.com/json/collection/v2.0.0/",
    "type": "object",
    "properties": {
        "info": {
            "$ref": "#/definitions/info"
        },
        "item": {
            "type": "array",
            "description": "Items are the basic unit for a Postman collection. You can think of them as corresponding to a single API endpoint. Each Item has one request and may have multiple API responses associated with it.",
            "items": {
                "title": "Items",
                "oneOf": [
                    {
                        "$ref": "#/definitions/item"
                    },
                    {
                        "$ref": "#/definitions/item-group"
                    }
                ]
            }
        },
        "event": {
            "$ref": "#/definitions/event-list"
        },
        "variable": {
            "$ref": "#/definitions/variable-list"
        },
        "auth": {
            "oneOf": [
                {
                    "type": "null"
                },
                {
                    "$ref": "#/definitions/auth"
                }
            ]
        }
    },
    "required": [
        "info",
        "item"
    ],
    "definitions": {
        "auth": {
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth",
            "description": "Represents authentication helpers provided by Postman",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "awsv4",
                        "basic",
                        "bearer",
                        "digest",
                        "hawk",
                        "ntlm",
                        "noauth",
                        "oauth1",
                        "oauth2"
                    ]
                },
                "awsv4": {
                    "type": "object",
                    "title": "AWS Signature v4",
                    "description": "This helper attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html)",
                    "properties": {
                        "accessKey": {
                            "type": "string",
                            "description": "AWS Signature V4 calculation requires the AWS Access Key of the AWS IAM user being used. This key is stored in this field.\n *Note: Do not use your AWS root credentials here.*"
                        },
                        "secretKey": {
                            "type": "string",
                            "description": "The AWS Secret key associated with the Access Key is stored in this field.\n *Note: Do not use your AWS root credentials here.*"
                        },
                        "region": {
                            "type": "string",
                            "description": "The AWS region code, must be one of the ones mentioned in the [AWS Documentation](http://docs.aws.amazon.com/general/latest/gr/rande.html)"
                        },
                        "service": {
                            "type": "string",
                            "description": "The AWS Service endpoint. Refer to the [AWS Documentation](http://docs.aws.amazon.com/general/latest/gr/rande.html) for possible values."
                        }
                    }
                },
                "basic": {
                    "type": "object",
                    "title": "Basic Authentication",
                    "description": "The helper attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)",
                    "properties": {
                        "username": {
                            "type": "string",
                            "description": "The username to be used for Basic Authentication is stored in this field."
                        },
                        "password": {
                            "type": "string",
                            "description": "The password to be used for Basic Authentication is stored in this field."
                        }
                    }
                },
                "bearer": {
                    "type": "object",
                    "title": "Bearer Token Authentication",
                    "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                    "properties": {
                        "token": {
                            "type": "string",
                            "description": "The token to be used for Bearer Authentication is stored in this field."
                        }
                    }
                },
                "digest": {
                    "type": "object",
                    "title": "Digest Authentication",
                    "description": "The helper attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                    "properties": {
                        "username": {
                            "type": "string",
                            "description": "The username to be used for digest Authentication is stored in this field."
                        },
                        "realm": {
                            "type": "string",
                            "description": "The authentication 'realm' is stored in this field. Refer to [RFC 2617](https://tools.ietf.org/html/rfc2617) for details."
                        },
                        "password": {
                            "type": "string",
                            "description": "The password to be used for digest Authentication is stored in this field."
                        },
                        "nonce": {
                            "type": "string",
                            "description": "The Digest server challenges clients. A nonce is a part of that challenge, stored in this field."
                        },
                        "nonceCount": {
                            "type": "string",
                            "description": "The nonceCount is the hexadecimal count of the number of requests (including the current request) that the client has sent with the nonce value in this request."
                        },
                        "algorithm": {
                            "type": "string",
                            "description": "The algorithm to be used to sign the request."
                        },
                        "qop": {
                            "type": "string",
                            "description": "Indicates the 'quality of protection' applied by the client to the message."
                        },
                        "opaque": {
                            "type": "string",
                            "description": "A string of data, specified by the server, which should be returned by the client unchanged."
                        },
                        "clientNonce": {
                            "type": "string",
                            "description": "A client nonce enhances the security of HTTP Digest Authentication, and it is stored in this field."
                        },
                        "disableRetryRequest": {
                            "type": "boolean",
                            "default": false,
                            "description": "When set to true, disables interactive replay mode for the parent request."
                        }
                    }
                },
                "hawk": {
                    "type": "object",
                    "title": "Hawk Authentication",
                    "description": "Helper attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                    "properties": {
                        "authId": {
                            "type": "string",
                            "description": "Hawk Authentication requires a client identifier to be passed to the server. This field contains that identifier."
                        },
                        "authKey": {
                            "type": "string",
                            "description": "The secret that's shared by the server and the client. It is recommended to use an environment variable here, and set the value in your environment."
                        },
                        "algorithm": {
                            "type": "string",
                            "description": "The hashing algorithm used in this Hawk authentication request is stored in this field."
                        },
                        "user": {
                            "type": "string",
                            "description": "One can optionally send their username (if available) to the Hawk protected endpoint. This field holds the value, if given."
                        },
                        "nonce": {
                            "type": "string",
                            "description": "The Hawk server challenges clients. A nonce is a part of that challenge, stored in this field."
                        },
                        "extraData": {
                            "type": "string",
                            "description": "This field stores metadata for the current authentication request."
                        },
                        "appId": {
                            "type": "string",
                            "description": "Serves to identify the backend app in case multiple ones are supported. This field is optional."
                        },
                        "delegation": {
                            "type": "string",
                            "description": "This field is used when Hawk auth is used as a part of a larger protocol and serves as a place for handling complex scenarios such as access delegation."
                        },
                        "timestamp": {
                            "type": "string",
                            "description": "The timestamp for the current Hawk authentication request."
                        }
                    }
                },
                "noauth": {},
                "ntlm": {
                    "type": "object",
                    "title": "NTLM Authentication",
                    "description": "Helper attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                    "properties": {
                        "username": {
                            "type": "string",
                            "description": "The username to be used for NTLM Authentication is stored in this field."
                        },
                        "password": {
                            "type": "string",
                            "description": "The password to be used for NTLM Authentication is stored in this field."
                        },
                        "domain": {
                            "type": "string",
                            "description": "The domain to be used for NTLM Authentication is stored in this field."
                        },
                        "workstation": {
                            "type": "string",
                            "description": "The workstation to be used for NTLM Authentication is stored in this field."
                        },
                        "disableRetryRequest": {
                            "type": "boolean",
                            "description": "When set to true, disables interactive replay mode for the parent request."
                        }
                    }
                },
                "oauth1": {
                    "type": "object",
                    "title": "OAuth1",
                    "description": "Helper attributes for [OAuth2](https://oauth.net/1/)",
                    "properties": {
                        "consumerKey": {
                            "type": "string",
                            "description": "The oAuth1 Consumer Secret, along with the Consumer Key authenticates the client. This field holds the oAuth1 Consumer Key."
                        },
                        "consumerSecret": {
                            "type": "string",
                            "description": "The oAuth1 Consumer Secret, along with the Consumer Key authenticates the client. The consumer secret is stored in this field."
                        },
                        "token": {
                            "type": "string",
                            "description": "The request token is a temporary credential, and is stored by Postman in this field."
                        },
                        "tokenSecret": {
                            "type": "string",
                            "description": "Like the token, the request token secret is a temporary credential stored for the current authentication request."
                        },
                        "signatureMethod": {
                            "type": "string",
                            "description": "The name of the signature method used by the client to sign the request."
                        },
                        "timestamp": {
                            "type": "string",
                            "description": "The timestamp associated with the current authentication request is stored in this field."
                        },
                        "nonce": {
                            "type": "string",
                            "description": "A nonce is a random string, uniquely generated by the client to allow the server to verify that a request has never been made before and helps prevent replay attacks when requests are made over a non-secure channel."
                        },
                        "version": {
                            "type": "string",
                            "description": "The oAuth version, usually, this is ``1.0`` for OAuth-1. For OAuth 2, use the dedicated OAuth 2.0 authentication helper instead."
                        },
                        "realm": {
                            "type": "string",
                            "description": "The realm directive is required for all authentication schemes that issue a challenge. Refer to [RFC 2617](http://tools.ietf.org/html/rfc2617#section-1.2) for more details."
                        },
                        "encodeOAuthSign": {
                            "type": "string",
                            "description": "This indicates whether or not to encode the request signature."
                        },
                        "addParamsToHeader": {
                            "type": "boolean",
                            "default": false,
                            "description": "This indicates whether or not to add the authorization params to the Authorization header."
                        },
                        "addEmptyParamsToSign": {
                            "type": "boolean",
                            "default": false,
                            "description": "This indicates whether or not to include empty valued parameters in the request signature."
                        }
                    }
                },
                "oauth2": {
                    "type": "object",
                    "title": "OAuth2",
                    "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                    "properties": {
                        "accessToken": {
                            "type": "string",
                            "description": "The access token for the current request is stored in this field."
                        },
                        "addTokenTo": {
                            "type": "string",
                            "enum": [
                                "header",
                                "queryParams"
                            ],
                            "description": "The specifier for token handling behaviour is stored in this field."
                        },
                        "callBackUrl": {
                            "type": "string",
                            "description": "This field contains the URL that has to be hit when the authentication process has completed."
                        },
                        "authUrl": {
                            "type": "string",
                            "description": "The OAuth2 providers URL is stored in this field."
                        },
                        "accessTokenUrl": {
                            "type": "string",
                            "description": "The URL to fetch access tokens is stored in this field."
                        },
                        "clientId": {
                            "type": "string",
                            "description": "The unique client ID associated with the authentication request is stored in this field."
                        },
                        "clientSecret": {
                            "type": "string",
                            "description": "The client secret associated with the current authentication request is stored in this field."
                        },
                        "clientAuth": {
                            "type": "string",
                            "enum": [
                                "body",
                                "header"
                            ],
                            "description": "The client authentication associated with the current request request is stored in this field."
                        },
                        "grantType": {
                            "type": "string",
                            "enum": [
                                "authorization_code",
                                "implicit",
                                "password_credentials",
                                "client_credentials"
                            ],
                            "description": "The grant type associated with the current authentication request is stored in this field."
                        },
                        "scope": {
                            "type": "string",
                            "description": "This field is used to specify the access privileges requested from the OAuth provider by the authentication request."
                        },
                        "username": {
                            "type": "string",
                            "description": "This field is used to specify the OAuth2 provider username for the current request."
                        },
                        "password": {
                            "type": "string",
                            "description": "This field is used to specify the OAuth2 provider password for the current request."
                        },
                        "tokenType": {
                            "type": "string",
                            "description": "This field is used to specify the OAuth2 token type for the current request."
                        },
                        "redirectUri": {
                            "type": "string",
                            "description": "This field is used to specify the redirection URL for OAuth2 authentication."
                        },
                        "refreshToken": {
                            "type": "string",
                            "description": "This field is used to specify the refresh token for OAuth2 authentication."
                        }
                    }
                }
            },
            "required": [
                "type"
            ]
        },
        "certificate-list": {
            "id": "#/definitions/certificate-list",
            "title": "Certificate List",
            "description": "A representation of a list of ssl certificates",
            "type": "array",
            "items": {
                "$ref": "#/definitions/certificate"
            }
        },
        "certificate": {
            "id": "#/definitions/certificate",
            "title": "Certificate",
            "description": "A representation of an ssl certificate",
            "type": "object",
            "properties": {
                "name": {
                    "description": "A name for the certificate for user reference",
                    "type": "string"
                },
                "matches": {
                    "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                    "type": "array",
                    "item": {
                        "type": "string",
                        "description": "An Url match pattern string"
                    }
                },
                "key": {
                    "description": "An object containing path to file containing private key, on the file system",
                    "type": "object",
                    "properties": {
                        "src": {
                            "description": "The path to file containing key for certificate, on the file system"
                        }
                    }
                },
                "cert": {
                    "description": "An object containing path to file certificate, on the file system",
                    "type": "object",
                    "properties": {
                        "src": {
                            "description": "The path to file containing key for certificate, on the file system"
                        }
                    }
                },
                "passphrase": {
                    "description": "The passphrase for the certificate",
                    "type": "string"
                }
            }
        },
        "cookie-list": {
            "id": "#/definitions/cookie-list",
            "title": "Certificate List",
            "description": "A representation of a list of cookies",
            "type": "array",
            "items": {
                "$ref": "#/definitions/cookie"
            }
        },
        "cookie": {
            "type": "object",
            "title": "Cookie",
            "id": "#/definitions/cookie",
            "description": "A Cookie, that follows the [Google Chrome format](https://developer.chrome.com/extensions/cookies)",
            "properties": {
                "domain": {
                    "type": "string",
                    "description": "The domain for which this cookie is valid."
                },
                "expires": {
                    "oneOf": [
                        {
                            "type": "string"
                        },
                        {
                            "type": "number"
                        }
                    ],
                    "description": "When the cookie expires."
                },
                "maxAge": {
                    "type": "string"
                },
                "hostOnly": {
                    "type": "boolean",
                    "description": "True if the cookie is a host-only cookie. (i.e. a request's URL domain must exactly match the domain of the cookie)."
                },
                "httpOnly": {
                    "type": "boolean",
                    "description": "Indicates if this cookie is HTTP Only. (if True, the cookie is inaccessible to client-side scripts)"
                },
                "name": {
                    "type": "string",
                    "description": "This is the name of the Cookie."
                },
                "path": {
                    "type": "string",
                    "description": "The path associated with the Cookie."
                },
                "secure": {
                    "type": "boolean",
                    "description": "Indicates if the 'secure' flag is set on the Cookie, meaning that it is transmitted over secure connections only. (typically HTTPS)"
                },
                "session": {
                    "type": "boolean",
                    "description": "True if the cookie is a session cookie."
                },
                "value": {
                    "type": "string",
                    "description": "The value of the Cookie."
                },
                "extensions": {
                    "type": "array",
                    "description": "Custom attributes for a cookie go here, such as the [Priority Field](https://code.google.com/p/chromium/issues/detail?id=232693)"
                }
            },
            "required": [
                "domain",
                "path"
            ]
        },
        "description": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/description",
            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
            "oneOf": [
                {
                    "type": "object",
                    "title": "Description",
                    "properties": {
                        "content": {
                            "type": "string",
                            "description": "The content of the description goes here, as a raw string."
                        },
                        "type": {
                            "type": "string",
                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                        },
                        "version": {
                            "description": "Description can have versions associated with it, which should be put in this property."
                        }
                    }
                },
                {
                    "type": "string"
                },
                {
                    "type": "null"
                }
            ]
        },
        "event-list": {
            "id": "#/definitions/event-list",
            "title": "Event List",
            "type": "array",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.",
            "items": {
                "$ref": "#/definitions/event"
            }
        },
        "event": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/event",
            "title": "Event",
            "description": "Defines a script associated with an associated event name",
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "A unique identifier for the enclosing event."
                },
                "listen": {
                    "type": "string",
                    "description": "Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."
                },
                "script": {
                    "$ref": "#/definitions/script"
                },
                "disabled": {
                    "type": "boolean",
                    "default": false,
                    "description": "Indicates whether the event is disabled. If absent, the event is assumed to be enabled."
                }
            },
            "required": [
                "listen"
            ]
        },
        "header-list": {
            "id": "#/definitions/header-list",
            "title": "Header List",
            "description": "A representation for a list of headers",
            "type": "array",
            "items": {
                "$ref": "#/definitions/header"
            }
        },
        "header": {
            "type": "object",
            "title": "Header",
            "id": "#/definitions/header",
            "description": "Represents a single HTTP Header",
            "properties": {
                "key": {
                    "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                    "type": "string"
                },
                "value": {
                    "type": "string",
                    "description": "The value (or the RHS) of the Header is stored in this field."
                },
                "disabled": {
                    "type": "boolean",
                    "default": false,
                    "description": "If set to true, the current header will not be sent with requests."
                },
                "description": {
                    "$ref": "#/definitions/description"
                }
            },
            "required": [
                "key",
                "value"
            ]
        },
        "info": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/info",
            "title": "Information",
            "description": "Detailed description of the info block",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "Name of the collection",
                    "description": "A collection's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this collection among a bunch of other collections, as such outlining its usage or content."
                },
                "_postman_id": {
                    "type": "string",
                    "description": "Every collection is identified by the unique value of this field. The value of this field is usually easiest to generate using a UID generator function. If you already have a collection, it is recommended that you maintain the same id since changing the id usually implies that is a different collection than it was originally.\n *Note: This field exists for compatibility reasons with Collection Format V1.*"
                },
                "description": {
                    "$ref": "#/definitions/description"
                },
                "version": {
                    "$ref": "#/definitions/version"
                },
                "schema": {
                    "description": "This should ideally hold a link to the Postman schema that is used to validate this collection. E.g: https://schema.getpostman.com/collection/v1",
                    "type": "string"
                }
            },
            "required": [
                "name",
                "schema"
            ]
        },
        "item-group": {
            "title": "Folder",
            "id": "#/definitions/item-group",
            "description": "One of the primary goals of Postman is to organize the development of APIs. To this end, it is necessary to be able to group requests together. This can be achived using 'Folders'. A folder just is an ordered set of requests.",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "A folder's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this folder."
                },
                "description": {
                    "$ref": "#/definitions/description"
                },
                "variable": {
                    "$ref": "#/definitions/variable-list"
                },
                "item": {
                    "description": "Items are entities which contain an actual HTTP request, and sample responses attached to it. Folders may contain many items.",
                    "type": "array",
                    "items": {
                        "title": "Items",
                        "anyOf": [
                            {
                                "$ref": "#/definitions/item"
                            },
                            {
                                "$ref": "#/definitions/item-group"
                            }
                        ]
                    }
                },
                "event": {
                    "$ref": "#/definitions/event-list"
                },
                "auth": {
                    "oneOf": [
                        {
                            "type": "null"
                        },
                        {
                            "$ref": "#/definitions/auth"
                        }
                    ]
                }
            },
            "required": [
                "item"
            ]
        },
        "item": {
            "type": "object",
            "title": "Item",
            "id": "#/definitions/item",
            "description": "Items are entities which contain an actual HTTP request, and sample responses attached to it.",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "A unique ID that is used to identify collections internally"
                },
                "name": {
                    "type": "string",
                    "description": "A human readable identifier for the current item."
                },
                "description": {
                    "$ref": "#/definitions/description"
                },
                "variable": {
                    "$ref": "#/definitions/variable-list"
                },
                "event": {
                    "$ref": "#/definitions/event-list"
                },
                "request": {
                    "$ref": "#/definitions/request"
                },
                "response": {
                    "type": "array",
                    "title": "Responses",
                    "items": {
                        "$ref": "#/definitions/response"
                    }
                }
            },
            "required": [
                "request"
            ]
        },
        "proxy-config": {
            "id": "#/definitions/proxy-config",
            "title": "Proxy Config",
            "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
            "type": "object",
            "properties": {
                "match": {
                    "default": "http+https://*/*",
                    "description": "The Url match for which the proxy config is defined",
                    "type": "string"
                },
                "host": {
                    "type": "string",
                    "description": "The proxy server host"
                },
                "port": {
                    "type": "integer",
                    "minimum": 0,
                    "default": 8080,
                    "description": "The proxy server port"
                },
                "tunnel": {
                    "description": "The tunneling details for the proxy config",
                    "default": false,
                    "type": "boolean"
                },
                "disabled": {
                    "type": "boolean",
                    "default": false,
                    "description": "When set to true, ignores this proxy configuration entity"
                }
            }
        },
        "request": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/request",
            "title": "Request",
            "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
            "oneOf": [
                {
                    "type": "object",
                    "title": "Request",
                    "properties": {
                        "url": {
                            "$ref": "#/definitions/url"
                        },
                        "auth": {
                            "oneOf": [
                                {
                                    "type": "null"
                                },
                                {
                                    "$ref": "#/definitions/auth"
                                }
                            ]
                        },
                        "proxy": {
                            "$ref": "#/definitions/proxy-config"
                        },
                        "certificate": {
                            "$ref": "#/definitions/certificate"
                        },
                        "method": {
                            "description": "The HTTP method associated with this request.",
                            "type": "string",
                            "enum": [
                                "GET",
                                "PUT",
                                "POST",
                                "PATCH",
                                "DELETE",
                                "COPY",
                                "HEAD",
                                "OPTIONS",
                                "LINK",
                                "UNLINK",
                                "PURGE",
                                "LOCK",
                                "UNLOCK",
                                "PROPFIND",
                                "VIEW"
                            ]
                        },
                        "description": {
                            "$ref": "#/definitions/description"
                        },
                        "header": {
                            "oneOf": [
                                {
                                    "$ref": "#/definitions/header-list"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "body": {
                            "type": "object",
                            "description": "This field contains the data usually contained in the request body.",
                            "properties": {
                                "mode": {
                                    "description": "Postman stores the type of data associated with this request in this field.",
                                    "enum": [
                                        "raw",
                                        "urlencoded",
                                        "formdata",
                                        "file"
                                    ]
                                },
                                "raw": {
                                    "type": "string"
                                },
                                "urlencoded": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "title": "UrlEncodedParameter",
                                        "properties": {
                                            "key": {
                                                "type": "string"
                                            },
                                            "value": {
                                                "type": "string"
                                            },
                                            "disabled": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "description": {
                                                "$ref": "#/definitions/description"
                                            }
                                        },
                                        "required": [
                                            "key"
                                        ]
                                    }
                                },
                                "formdata": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "title": "FormParameter",
                                        "oneOf": [
                                            {
                                                "properties": {
                                                    "key": {
                                                        "type": "string"
                                                    },
                                                    "value": {
                                                        "type": "string"
                                                    },
                                                    "disabled": {
                                                        "type": "boolean",
                                                        "default": false,
                                                        "description": "When set to true, prevents this form data entity from being sent."
                                                    },
                                                    "type": {
                                                        "type": "string",
                                                        "enum": [
                                                            "text"
                                                        ]
                                                    },
                                                    "description": {
                                                        "$ref": "#/definitions/description"
                                                    }
                                                },
                                                "required": [
                                                    "key"
                                                ]
                                            },
                                            {
                                                "properties": {
                                                    "key": {
                                                        "type": "string"
                                                    },
                                                    "src": {
                                                        "type": "string"
                                                    },
                                                    "disabled": {
                                                        "type": "boolean",
                                                        "default": false,
                                                        "description": "When set to true, prevents this form data entity from being sent."
                                                    },
                                                    "type": {
                                                        "type": "string",
                                                        "enum": [
                                                            "file"
                                                        ]
                                                    },
                                                    "description": {
                                                        "$ref": "#/definitions/description"
                                                    }
                                                },
                                                "required": [
                                                    "key"
                                                ]
                                            }
                                        ]
                                    }
                                },
                                "file": {
                                    "type": "object",
                                    "properties": {
                                        "src": {
                                            "type": "string",
                                            "description": "Contains the name of the file to upload. _Not the path_."
                                        },
                                        "content": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    "type": "string"
                }
            ]
        },
        "response": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/response",
            "title": "Response",
            "description": "A response represents an HTTP response.",
            "properties": {
                "id": {
                    "description": "A unique, user defined identifier that can  be used to refer to this response from requests.",
                    "type": "string"
                },
                "originalRequest": {
                    "$ref": "#/definitions/request"
                },
                "responseTime": {
                    "title": "ResponseTime",
                    "oneOf": [
                        {
                            "type": "string"
                        },
                        {
                            "type": "number"
                        }
                    ],
                    "description": "The time taken by the request to complete. If a number, the unit is milliseconds."
                },
                "header": {
                    "title": "Headers",
                    "oneOf": [
                        {
                            "type": "array",
                            "title": "Header",
                            "description": "No HTTP request is complete without its headers, and the same is true for a Postman request. This field is an array containing all the headers.",
                            "items": {
                                "oneOf": [
                                    {
                                        "$ref": "#/definitions/header"
                                    },
                                    {
                                        "title": "Header",
                                        "type": "string"
                                    }
                                ]
                            }
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "cookie": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/cookie"
                    }
                },
                "body": {
                    "type": "string",
                    "description": "The raw text of the response."
                },
                "status": {
                    "type": "string",
                    "description": "The response status, e.g: '200 OK'"
                },
                "code": {
                    "type": "integer",
                    "description": "The numerical response code, example: 200, 201, 404, etc."
                }
            }
        },
        "script": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/script",
            "title": "Script",
            "type": "object",
            "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
            "properties": {
                "id": {
                    "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
                    "type": "string"
                },
                "type": {
                    "description": "Type of the script. E.g: 'text/javascript'",
                    "type": "string"
                },
                "exec": {
                    "oneOf": [
                        {
                            "type": "array",
                            "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
                            "items": {
                                "type": "string"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "src": {
                    "$ref": "#/definitions/url"
                },
                "name": {
                    "type": "string",
                    "description": "Script name"
                }
            }
        },
        "url": {
            "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
            "id": "#/definitions/url",
            "title": "Url",
            "oneOf": [
                {
                    "type": "object",
                    "properties": {
                        "raw": {
                            "type": "string",
                            "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                        },
                        "protocol": {
                            "type": "string",
                            "description": "The protocol associated with the request, E.g: 'http'"
                        },
                        "host": {
                            "title": "Host",
                            "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                            "oneOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "The host, split into subdomain strings."
                                }
                            ]
                        },
                        "path": {
                            "oneOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "type": "array",
                                    "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                    "items": {
                                        "oneOf": [
                                            {
                                                "type": "string"
                                            },
                                            {
                                                "type": "object",
                                                "properties": {
                                                    "type": {
                                                        "type": "string"
                                                    },
                                                    "value": {
                                                        "type": "string"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "port": {
                            "type": "string",
                            "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                        },
                        "query": {
                            "type": "array",
                            "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                            "items": {
                                "type": "object",
                                "title": "QueryParam",
                                "properties": {
                                    "key": {
                                        "oneOf": [
                                            {
                                                "type": "string"
                                            },
                                            {
                                                "type": "null"
                                            }
                                        ]
                                    },
                                    "value": {
                                        "oneOf": [
                                            {
                                                "type": "string"
                                            },
                                            {
                                                "type": "null"
                                            }
                                        ]
                                    },
                                    "disabled": {
                                        "type": "boolean",
                                        "default": false,
                                        "description": "If set to true, the current query parameter will not be sent with the request."
                                    },
                                    "description": {
                                        "$ref": "#/definitions/description"
                                    }
                                }
                            }
                        },
                        "hash": {
                            "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                            "type": "string"
                        },
                        "variable": {
                            "type": "array",
                            "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                            "items": {
                                "$ref": "#/definitions/variable"
                            }
                        }
                    }
                },
                {
                    "type": "string"
                }
            ]
        },
        "variable-list": {
            "id": "#/definitions/variable-list",
            "title": "Variable List",
            "description": "Collection variables allow you to define a set of variables, that are a *part of the collection*, as opposed to environments, which are separate entities.\n*Note: Collection variables must not contain any sensitive information.*",
            "type": "array",
            "items": {
                "$ref": "#/definitions/variable"
            }
        },
        "variable": {
            "id": "#/definitions/variable",
            "title": "Variable",
            "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
            "type": "object",
            "properties": {
                "id": {
                    "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                    "type": "string"
                },
                "key": {
                    "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                    "type": "string"
                },
                "value": {
                    "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                },
                "type": {
                    "description": "A variable may have multiple types. This field specifies the type of the variable.",
                    "type": "string",
                    "enum": [
                        "string",
                        "boolean",
                        "any",
                        "number"
                    ]
                },
                "name": {
                    "type": "string",
                    "description": "Variable name"
                },
                "description": {
                    "$ref": "#/definitions/description"
                },
                "system": {
                    "type": "boolean",
                    "default": false,
                    "description": "When set to true, indicates that this variable has been set by Postman"
                },
                "disabled": {
                    "type": "boolean",
                    "default": false
                }
            },
            "anyOf": [
                {
                    "required": [
                        "id"
                    ]
                },
                {
                    "required": [
                        "key"
                    ]
                },
                {
                    "required": [
                        "id",
                        "key"
                    ]
                }
            ]
        },
        "version": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/version",
            "title": "Collection Version",
            "description": "Postman allows you to version your collections as they grow, and this field holds the version number. While optional, it is recommended that you use this field to its fullest extent!",
            "oneOf": [
                {
                    "type": "object",
                    "properties": {
                        "major": {
                            "description": "Increment this number if you make changes to the collection that changes its behaviour. E.g: Removing or adding new test scripts. (partly or completely).",
                            "minimum": 0,
                            "type": "integer"
                        },
                        "minor": {
                            "description": "You should increment this number if you make changes that will not break anything that uses the collection. E.g: removing a folder.",
                            "minimum": 0,
                            "type": "integer"
                        },
                        "patch": {
                            "description": "Ideally, minor changes to a collection should result in the increment of this number.",
                            "minimum": 0,
                            "type": "integer"
                        },
                        "identifier": {
                            "description": "A human friendly identifier to make sense of the version numbers. E.g: 'beta-3'",
                            "type": "string",
                            "maxLength": 10
                        },
                        "meta": {}
                    },
                    "required": [
                        "major",
                        "minor",
                        "patch"
                    ]
                },
                {
                    "type": "string"
                }
            ]
        }
    }
};

module.exports = PostmanCollectionSchema;