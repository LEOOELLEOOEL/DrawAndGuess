/**
 * Created by 李豪 on 2015/12/2 0002.
 */
var fs=require("fs");
eval(fs.readFileSync("js/dataType.js")+"");//同步读取文件
var ws = require("websocket-server");
var server = ws.createServer();
var connIDS=[];
server.addListener("connection", function(connection){
    connIDS.push(connection.id);
    if(connIDS.length==1){
        tokenMessage.hasToken=true;
        server.send(connIDS[0],JSON.stringify(tokenMessage));
    }
    else
    {
        tokenMessage.hasToken=false;
    }
    connection.addListener("message", function(msg){
        // server.send(msg);

        console.log(msg);
        var chat = JSON.parse(msg);
        chat.id = connection.id;
        var content = JSON.stringify(chat);
        server.broadcast(content);
        //server.broadcast(msg);
        //connection.broadcast(msg);
    });
    connection.addListener("close", function (){
        var closeid = connection.id;
        var newConnIDS=[];
        var num;
        for (var i = 0; i < connIDS.length; i++)
        {
            if (connIDS[i] == closeid) {
                num = i;
            }
        }
        for (var j = 0; j < connIDS.length-1; j++)
        {
            if(num==connIDS.length-1){
                newConnIDS[j]=connIDS[j];
            }else {
                if (j <num) {
                    newConnIDS[j] = connIDS[j];
                } else {

                    newConnIDS[j] = connIDS[j+1];
                }
            }
        }
        tokenMessage.hasToken = true;
        connIDS=newConnIDS;
        server.send( connIDS[0],JSON.stringify(tokenMessage));
    });
}).listen(5555);
console.log("The server is RUNNING...");