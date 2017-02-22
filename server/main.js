import { Meteor } from 'meteor/meteor';
/*
Arquivo que irá manipular os códigos do servidor
*/

Meteor.startup(() => {
  // code to run on server at startup
});

//Exclui a que esta salva no servidor para lançar uma nova que será a senha corrente.
Meteor.methods({
	"removerAll": function(){
		Pass.remove({});
	}
});

//Modifica o status chamada
Meteor.methods({
	"status_pass" : function(msg){
		Chamadas.update(msg.id, {$set: {status: msg.status}});
	}
});

//Cria uma nova senha incrementada
Meteor.methods({
	"newPool": function(msg){
		Chamadas.insert(
			{senha: msg.senha, status : msg.status, data_inicio: msg.data_inicio, medico: msg.medico});
	}
});

Meteor.methods({

	"newToch": function (msg){

		Retirada.insert({count: 1});
	}
});

Meteor.methods({

	"passIncrement": function (msg){

		let count = Retirada.find({}).fetch()[0].count,
			id = Retirada.find({}).fetch()[0]._id;

		Retirada.update(id, {count: count + 1});
	}
});