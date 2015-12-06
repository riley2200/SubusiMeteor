/**
 * Created by Riley on 04/12/2015.
 */
Meteor.methods({
   subusiHelloWorld : function(){

       var ws = Meteor.npmRequire('ws.js');
           var Http = ws.Http;
           var Security = ws.Security;
           var UsernameToken = ws.UsernameToken;

       var request =  '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
           '<Header />' +
           '<Body>' +
           '<EchoString xmlns="http://tempuri.org/">' +
           '<s>123</s>' +
           '</EchoString>' +
           '</Body>' +
           '</Envelope>';

       var ctx =  { request: request
           , url: "https://subusi.monsterservice.dk:444/SubusiService.svc/secure"
           , action: "http://tempuri.org/ISubusiService/HelloWorld"
           , contentType: "text/xml"
       };


       var handlers =  [ new Security({}, [new UsernameToken({username: "allan", password: "222"})])
           , new Http()
       ];

       ws.send(handlers, ctx, function(ctx) {
           console.log("response: " + ctx.response);
       });
   }

});