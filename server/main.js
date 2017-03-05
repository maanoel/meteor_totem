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

Meteor.methods({
	"cleanMongo": function(){
		Pass.remove({});
		Chamadas.remove({});
		Retirada.remove({});
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

	"newPool": function(senha,status,data_inicio,medico){
		//console.log('msg.senha: ' + msg.senha);
		Chamadas.insert(
			{senha: senha, status : status, data_inicio: data_inicio, medico: medico});

		return Chamadas.find({}).fetch();
	}
	
});

Meteor.methods({

	"newToch": function (){
		if(Retirada.find({}).fetch().length == 0 )
			Retirada.insert({count: 0});
	}
});

Meteor.methods({

	"passIncrement": function (msg){
		let count = Retirada.find({}).fetch()[0].count,
			id = Retirada.find({}).fetch()[0]._id;

		Retirada.update(id, {count: msg.newPass});

	}
});