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
    {
        return this['Kunde'][0]['Name'][0];
    },
    getIndex : function(){
        return this['Index'][0];
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
