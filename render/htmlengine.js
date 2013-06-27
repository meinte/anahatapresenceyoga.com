var Step = require('step')          //step is a lib for serial/parallel code execution. templatesloaded is executed once readTemplates is ready > https://github.com/creationix/step
    ,fs = require('fs')    
    ,templateMasterMap={}
    ,sharedFolder = null;


function setSharedFolder(folder){
    sharedFolder = folder;
}

function addMap(templateLocation,masterLocation){   
    if(!templateMasterMap[templateLocation]) templateMasterMap[templateLocation] =[];    
    templateMasterMap[templateLocation].push(masterLocation);
}


//TODO caching is not implemented. This whole thing is a stub anyway
function render(path, options, callback){ 
  
        var templates = [path];
       
        //step is a lib for serial/parallel code execution. templatesloaded is executed once readTemplates is ready > https://github.com/creationix/step
        Step(
            function readTemplates(){
                var group = this.group();
                templates.forEach(
                    function(templatePath){
						fs.readFile(templatePath, {encoding :'utf8',flag:'r'},group());            
                    }   
                );
            },
            function templatesLoaded(err,result){
                if(err){
                    if(callback)callback(err,null);
                    else throw new Error(err);
                }else{
                    var localTemplate = result.shift();
                    var tS = localTemplate.toString();
                    if(callback)callback(null,tS);
                    else return tS;
                }             
            }
           
       );
}

exports.renderFile = render;
exports.setSharedFolder = setSharedFolder;
exports.addMap = addMap;
