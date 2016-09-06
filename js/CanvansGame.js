
//��������ռ�
var webSocketGame={
    canvas:null,//canvas object
    ctx:null,//canvasRendering2D object
    canDraw:false,
    startX:0,//���X����
    startY:0,//���Y����
    ws:null,//webSocket����
    drawToken:false,//����
    paintColor:null,
    paintWidth:null,
    brush:null
};
paint_Color();
paint_Width();
//��ͼ
function DrawLine(x,y,x1,y1,width,color){
webSocketGame.ctx.strokeStyle=color;
webSocketGame.ctx.lineWidth=width;
webSocketGame.ctx.beginPath();
webSocketGame.ctx.moveTo(x,y);
webSocketGame.ctx.lineTo(x1,y1);
webSocketGame.ctx.closePath();
webSocketGame.ctx.stroke();
}
//function DrawLine2(x,y,x1,y1,width,color){
//    webSocketGame.ctx.strokeStyle=webSocketGame.paintColor;
//    webSocketGame.ctx.lineWidth=webSocketGame.paintWidth;
//    webSocketGame.ctx.beginPath();
//    webSocketGame.ctx.moveTo(x,y);
//    webSocketGame.ctx.lineTo(x1,y1);
//    webSocketGame.ctx.closePath();
//    webSocketGame.ctx.stroke();
//}
//������ɫ
function paint_Color(){
    $("#yellow").click(function(){
       webSocketGame.paintColor="yellow";
    });
    $("#black").click(function(){
        webSocketGame.paintColor="black";
    });
    $("#zise").click(function(){
        webSocketGame.paintColor=" #800080";
    });
    $("#red").click(function(){
        webSocketGame.paintColor="red";
    });
    $("#green").click(function(){
        webSocketGame.paintColor="green";
    });
    $("#blue").click(function(){
        webSocketGame.paintColor="blue";
    });
    $("#aqua").click(function(){
        webSocketGame.paintColor="aqua";
    });
}
//���ʴ�ϸ
function paint_Width(){
    $("#width_10px").click(function(){
        webSocketGame.paintWidth=3;
    })
    $("#width_20px").click(function(){
        webSocketGame.paintWidth=8;
    })
    $("#width_40px").click(function(){
        webSocketGame.paintWidth=14;
    })
}
//��������������
$(function(){
    webSocketGame.canvas=$("#drawing-pad")[0];
    webSocketGame.ctx=webSocketGame.canvas.getContext("2d");//����canvans��2d����
    $(webSocketGame.canvas).mousedown(function(e){//��갴��
        console.log("mousedown����");
        webSocketGame.canDraw=true;
        //�õ�cnavas����������������
        var canvasposition=$(this).offset();
        var canvaspositionX=canvasposition.left;
        var canvaspositionY=canvasposition.top;
        //�õ���������������������
        var screenpositionX= e.pageX;
        var screenpositionY= e.pageY;
        //�������
        webSocketGame.startX=screenpositionX-canvaspositionX;
        webSocketGame.startY=screenpositionY-canvaspositionY;
        })
        .mousemove(function(e){//�����ƶ�
            if(webSocketGame.canDraw) {
                console.log("mousedraw����");
                //�õ�cnavas����������������
                var canvasposition=$(this).offset();
                var canvaspositionX1=canvasposition.left;
                var canvaspositionY1=canvasposition.top;
                //�õ���������������������
                var screenpositionX1= e.pageX;
                var screenpositionY1= e.pageY;
                //��ͼ
                DrawLine(webSocketGame.startX,webSocketGame.startY,screenpositionX1-canvaspositionX1,screenpositionY1-canvaspositionY1,webSocketGame.paintWidth,webSocketGame.paintColor);
                //����ʼ����ͨ��webSocket���ݸ�������
                DrawMessage.startX=webSocketGame.startX;
                DrawMessage.startY=webSocketGame.startY;
                //���յ�����ͨ��webSocket���ݸ�������
                DrawMessage.endX=screenpositionX1-canvaspositionX1;
                DrawMessage.endY=screenpositionY1-canvaspositionY1;
                webSocketGame.ws.send(JSON.stringify( DrawMessage));
                webSocketGame.startX=screenpositionX1-canvaspositionX1;
                webSocketGame.startY=screenpositionY1-canvaspositionY1;

            }
    })
        .mouseup(function(e){//����ɿ�
            console.log("mouseup����");
            webSocketGame.canDraw=false;
        })
});

//function DrawOrClear(){
//    if(webSocketGame.tool=="pen"){
//        readyToDraw();
//    }else{
//        readyToClear();
//    }
//}
//function readyToDraw(){
//    $(webSocketGame.canvas).bind("mousemove",function(e){
//        if(webSocketGame.canDraw){
//            var canvasPos=$(this).offset();
//            var canvasPosX=canvasPos.left;
//            var canvasPosY=canvasPos.top;
//            var mouseX= e.pageX;
//            var mouseY= e.pageY;
//            var currentX=mouseX-canvasPosX;
//            var currentY=mouseY-canvasPosY;
//            drawline(webSocketGame.startX,webSocketGame.startY,currentX,currentY,webSocketGame.width,webSocketGame.color);
//            drawMessage.startX=webSocketGame.startX;
//            drawMessage.startY=webSocketGame.startY;
//            drawMessage.endX=currentX;
//            drawMessage.endY=currentY;
//            drawMessage.width=webSocketGame.width;
//            drawMessage.color=webSocketGame.color;
//            if(ws){
//                ws.send(JSON.stringify(drawMessage));
//            }
//            webSocketGame.startX=currentX;
//            webSocketGame.startY=currentY;
//        }
//    })
//}
//function readyToClear(){
//    $(webSocketGame.canvas).bind("mousemove",function(e){
//        if(webSocketGame.canClear){
//            var canvasPos=$(this).offset();
//            var canvasPosX=canvasPos.left;
//            var canvasPosY=canvasPos.top;
//            var mouseX= e.pageX;
//            var mouseY= e.pageY;
//            var currentX=mouseX-canvasPosX;
//            var currentY=mouseY-canvasPosY;
//            clearing(currentX,currentY);
//            clearMessage.x= currentX;
//            clearMessage.y= currentY;
//            if(ws){
//                ws.send(JSON.stringify(clearMessage));
//            }
//        }
//    })
//}
//function clearing(x,y){
//    webSocketGame.ctx.clearRect(x,y,20,20);
//}
//���»�ͼ
$("#reDraw").click(function(){
    webSocketGame.ctx.clearRect(0,0,800,400);
});
//����WebSocket
if(window.WebSocket){
    webSocketGame.ws=new WebSocket("ws://127.0.0.1:5555")
    webSocketGame.ws.onopen = function () {
        alert("Server connection is SUCCESSFUL!");
    };
    webSocketGame.ws.onclose = function () {
        alert("The server has been CLOSED!");
    };
    webSocketGame.ws.onerror = function () {
        alert("The server connection ERROR!");
    };
    //��Ϣ����
    webSocketGame.ws.onmessage=function(msg){
        var data=JSON.parse(msg.data);
        switch (data.type){
            case dataType.chatMessage:
                $("<li>").html(data.id+"˵"+data.content).appendTo($("#nothing"));
                break;
            case dataType.drawMessage:
                  //data.paintWidth=webSocketGame.paintWidth;
                  //  data.paintColor=webSocketGame.paintColor;
                DrawLine(data.startX,data.startY,data.endX,data.endY,webSocketGame.paintWidth,webSocketGame.paintColor);
                break;
            case dataType.tokenMessage:
                break;
        }
    };
}