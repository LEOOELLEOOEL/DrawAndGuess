
//消息枚举格式
var dataType={
    chatMessage:0,//聊天消息
    drawMessage:1,//绘图消息
    //消除消息
    tokenMessage:2,//令牌消息
};
//绘画消息
var DrawMessage={
    type:dataType.drawMessage,//消息类型为绘画消息
    startX:0,//绘画的开始x点
    startY:0,//绘画的开始y点
    endX:0,//绘画的结束x点
    endY:0,//绘画的结束y点
    paintColor:"blue",//绘画颜色
    paintWidth:3//绘画的画笔大小
};
//令牌消息格式
var tokenMessage={
    type:dataType.tokenMessage,//消息类型为令牌消息
    hasToken:false//含有令牌，是否有令牌，默认为false，没有令牌
};

