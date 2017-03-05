import atualizarChamadas from './fila.js';

Template.retirada.helpers({

	nextPass: function(){

		let nextPass = Retirada.find({}).fetch().length > 0 ? Retirada.find({}).fetch()[0].count : null;


		if(!nextPass){

			  nextPass = 0;
			  Meteor.call("newToch",{}, function (err){
			 	if(err) alert(err);
			 	Session.set("nextPass", nextPass);
			 })
		}

		Session.set("nextPass", nextPass);
		console.log(Session.get("nextPass"));
		
		return  Number(Session.get("nextPass")) + 1;

	}

});
 
Template.retirada.events({

	"click button": function(e,template){

		let newPass = e.target.id,
			id = Retirada.find({}).fetch()[0]._id;

		if(isNaN(newPass)) return;

		Retirada.update(id, {count: newPass});
		Chamadas.insert(
			{senha: newPass, status : 'E', data_inicio: new Date(), medico: 1});

		/*MIGRAR O CÓDIGO ACIMA PARA ESTA ESTRUTURA DE BAIXO
		Meteor.call("passIncrement",{newPass: newPass}, function (err){
		 	if(err){ 
		 		alert(err);
		 	}else{

		 		Meteor.apply(
				    'newPool', 
				    [newPass, 'E', new Date(), 1], 
				    { returnStubValue: true }
				  );

		
		 		 Meteor.call("newPool", {
			 		 	senha: newPass, 
			 		 	status: "E", 
			 		 	data_inicio: new Date(), 
			 		 	medico: 1
		 		 	},function(err){
					if(err) {
						alert(err)
					}
				});

	
		 	}
		 });
		*/
	} 

});