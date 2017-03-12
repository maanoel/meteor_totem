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
	"updatePass": function(msg){

		console.log(msg.id);

		if( Pass.find({}).fetch().length == 0 ){
			Pass.insert({
				senha: msg.senha,
				site : msg.site
			});
		}else{

			let id = Pass.find({}).fetch()[0]._id;

			Pass.update(id,{$set: {
				senha: msg.senha,
				site : msg.site
			}});

		}
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

	"newPool": function(msg){
		//console.log('msg.senha: ' + msg.senha);
		let count = Retirada.find({}).fetch()[0].count,
		id = Retirada.find({}).fetch()[0]._id;

		count++;

		Chamadas.insert(
			{senha: count, status : msg.status, data_inicio: msg.data_inicio, medico: msg.medico, site: msg.site});

		Retirada.update(id, {count: count, site: msg.site });
	}
	
});

Meteor.methods({

	"newToch": function (){
		if(Retirada.find({}).fetch().length == 0 )
			Retirada.insert({count: 0});
	}
});


