Template.fila.helpers({
	hasContent: function(msg) {		
		return Session.get("hasContent");
	}
});

Template.fila.helpers({
	chamadasAtendimento: function() {
        //return Session.get("chamadas");
        return Chamadas.find({medico: 1},{sort: {data_inicio: -1}}).fetch().filter((el)=>{
        	return (el.status == 'A');
        }).slice(0,11);/*.forEach((obj)=>{
        	//Deixei como alternativa para alterar o formato das datas.
        });*/
      }
});


Template.fila.helpers({
	chamadasEspera: function() {
        return Chamadas.find({medico: 1},{sort: {data_inicio: -1}}).fetch().filter((el)=>{
        	return el.status == 'E';
        }).slice(0, 11);
      }
});

Template.fila.helpers({
	chamadasFinalizada: function() { 
        return Chamadas.find({medico: 1},{sort: {data_inicio: -1}}).fetch().filter((el)=>{
        	return el.status == 'F';
        }).slice(0, 11);
      }
});

Template.fila.events({
	"click button": function(e,template){
		
		//Remove a senha atual para lançar a próxima
		e.preventDefault();
		
		let callback = function(){

			Meteor.call("removerAll", function(){

				if( Pass.find({}).fetch().length == 0 ){

					Pass.insert({
						senha: e.target.value
					});
				}

			});
		}
		
		let status = e.target.name == "A" ? "F" : e.target.name  == "E" ? "A" : "F";

		Chamadas.update(e.target.id, {$set: {status: status}});
		callback();

		/*Meteor call é para chamar o methods, e atualizar a collecttions
		Meteor.call("status_pass", {status : status, id: e.target.id}, function(err){
			if(!err) {
				callback();
			}
		});
		*/
	}
});


Template.fila.events({

	"change select" : function(e, template){
		
		let status =  e.target.options[e.target.selectedIndex].value;

		Meteor.call("status_pass", {status : status, id: e.target.id}, function(err){
			if(err) {
				alert(err);
			}
		});
	}
});