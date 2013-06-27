exports.setupRoutes=function(app){
    var homeRouter = require(GLOBAL.__approot+"/controllers/routers/homeRouter.js");    
    app.get('/', homeRouter.home); 
}

exports.setupRenderEngine=function(app){    
    var htmlEngine = require(GLOBAL.__approot+'/render/htmlengine.js')
    ,templateFolder =  GLOBAL.__approot + '/views/templates/'
    ,masterFolder=  GLOBAL.__approot + '/views/templates/master/';
    
    htmlEngine.setSharedFolder(masterFolder);
    //htmlEngine.addMap('*',masterFolder+'global.html');
    
    app.engine('html', htmlEngine.renderFile);
    app.set('views',templateFolder);
}