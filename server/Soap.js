/**
 * Created by Riley on 04/12/2015.
 */
var Future = Npm.require( 'fibers/future' );
Meteor.methods({
   subusiHelloWorld : function(args){
       var future = new Future();

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
           , action: "http://tempuri.org/ISubusiService/GetDeliveries"
           , contentType: "text/xml"
       };


       var handlers =  [ new Security({}, [new UsernameToken({username: args.name, password: args.pass})])
           , new Http()
       ];
        console
            .log(ctx.request)
       ws.send(handlers, ctx, function(ctx) {
           console.log("response: " + ctx.response);
           var _time = (new Date).toString();
           console.log("before" +_time);
           xml2js.parseString( ctx.response, function (err, result) {
               if(result['s:Envelope']['s:Body'][0]['s:Fault'])
               {
                   var _time = (new Date).toString();
                   console.log("error" +  _time);
                   future.return(null);
               }else {
                   var newResult = result['s:Envelope']['s:Body'][0]['GetDeliveriesResponse'][0]["GetDeliveriesResult"][0];
                   var Deliveries = newResult['Deliveries'][0]['ShallowLevering'];
                   var _time = (new Date).toString();
                   console.log("no errors " + _time);
                   future.return(Deliveries);
               }
           });
       });
       return future.wait();
   }

});