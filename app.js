GLOBAL.__approot = __dirname;
var express = require("express")  
    ,path = require('path')   
    ,startupCommands = require('./controllers/startupCommands.js')   
    ,app = express();
   
//,startupCommands = require(GLOBAL.__approot+'/controllers/startupCommands.js')
app.use(express.static(path.join(__dirname, '/views/resources')));


express.static.mime.define({'application/font-woff': ['woff']});
express.static.mime.define({'application/x-font-ttf': ['ttf']});
express.static.mime.define({'application/vnd.ms-fontobject': ['eot']});
express.static.mime.define({'font/opentype': ['otf']});

app.use(express.compress());
app.use(express.bodyParser());
app.use(app.router);

startupCommands.setupRoutes(app);
startupCommands.setupRenderEngine(app);

var PORT =(process.env.PORT)?process.env.PORT:8080;
var IP=(process.env.IP)?process.env.IP:null;

if(IP){
    app.listen(PORT,IP);
}else{
    app.listen(PORT);
}
