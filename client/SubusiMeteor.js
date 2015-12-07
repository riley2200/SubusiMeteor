/**
 * Created by Riley on 07-12-2015.
 */
Template.TestSoap.onCreated(function(){
    this.soapVar = new ReactiveVar(null);
});


Template.TestSoap.helpers({
    getSoap : function(){

        var soapXml = Template.instance().soapVar.get();
        if(soapXml) {
            return  soapXml;
        }
    },
    getKundeName : function()
    { var kundeName = this['Kunde'][0]['Name'][0];
        return kundeName;
    },
    getX : function(){
        var localX = this['Adresse'][0]['X'][0];
        return localX;
    } ,
    getY : function(){
        var localY = this['Adresse'][0]['Y'][0];
        return localY;
    },
    getAdresse :function(){
        var adress = this['Adresse'][0]['Adresse'][0];
        return adress;
    }
});


Template.TestSoap.events({
    'submit': function(event,template)
    {
        var self = Template.instance();
        var name = event.target.name.value;
        var pass = event.target.pass.value;
        event.preventDefault();
        var args = {name: name, pass: pass};
        Meteor.call('subusiHelloWorld', args,  function(err, data){
            if(err)
            {

            }else
            {
                self.soapVar.set(data);
            }
        });
        return false;
    }
});
