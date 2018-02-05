exports.sayHello = function(req, res) {

    var helloWorld = {"Hello": "world"}
        res.json(helloWorld);

};