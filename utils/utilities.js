const fs=require('fs');


exports.removeDir=async(ticketId)=>{
    removeDirectory(ticketId)
}


function removeDirectory(path){
    if(fs.existsSync(path)){
        const files=fs.readdirSync(path)
        console.log(files.length);
        if(files.length>0){
            files.forEach(file=>{
                if(fs.statSync(path+"/"+file).isDirectory()){
                    removeDirectory(path+"/"+file)
                }else{
                    fs.unlinkSync(path+"/"+file)
                }
            })
            fs.rmdirSync(path)
        }else{
            fs.rmdirSync(path)
        }
    }else[
        console.log("Directory path not found.")
    ]
}