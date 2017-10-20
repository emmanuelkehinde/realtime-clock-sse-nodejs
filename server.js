var app = require('express')();
var SSE=require('sse-nodejs');

app.set('port', (process.env.PORT || 5000));

app.get('/',function(req,res){
    res.sendFile(__dirname+ '/index.html');
});

app.get('/get/time',function(req,res){
    var app = SSE(res);
    
    app.sendEvent('time_change', function () {
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return time
    },1000);

    app.disconnect(function () {
        console.log("disconnected");
    });
});


app.listen(app.get('port'), function(){
    console.log('Server listening on port: ', app.get('port'));
});