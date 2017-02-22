Template.fila.helpers({
	hasContent: function(msg) {		
		return Session.get("hasContent");
	}
});

Template.fila.helpers({
	chamadas: function (msg){
		return Session.get("chamadas");
	}

});

//Eventos
Template.fila.events({
	"submit form": function (e, template){
		e.preventDefault();
		atualizarChamadas(e, template);
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
		console.log(status);

		Meteor.call("status_pass", {status : status, id: e.target.id}, function(err){
			if(!err) {
				let medico = 1,
				chamadas = Chamadas.find({medico : medico}).fetch()

				definirTableView(chamadas);
				callback();
			}
		});

		//Session.set("currentPass", e.target.value);
	}
});


Template.fila.events({

	"change select" : function(e, template){
		
		let status =  e.target.options[e.target.selectedIndex].value;

		Meteor.call("status_pass", {status : status, id: e.target.id}, function(err){
			if(!err) {
				let chamadas = Chamadas.find({medico : 1}).fetch()
				definirTableView(chamadas);
			}
		});

		console.log(e.target.options[e.target.selectedIndex].value);
		
	}
});

//functions

function atualizarChamadas(e, template) {

	let filter = template.findAll("input"),
			chamadas = Chamadas.find({medico : 1}).fetch();

	definirTableView(chamadas);

		
}

function definirTableView(chamadas){

		for(let chamada in chamadas){

			switch(chamadas[chamada].status){
				case "E":
					chamadas[chamada].espera = true;
					break;
				case "A":
					chamadas[chamada].atendimento = true;
					break;
				case "F":
					chamadas[chamada].finalizada = true;
					break;
				default:
					break;
			}

		}

		Session.set("chamadas", chamadas);
}