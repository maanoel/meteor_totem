import atualizarChamadas from './fila.js';
import * as moment from 'moment';
//import 'moment/locale/pt-br';

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

		e.preventDefault();

		let newPass = e.target.id,
			id = Retirada.find({}).fetch()[0]._id,
			site = document.getElementById("sel").value,
			senha = "";

		let moment = require('moment');
		moment.locale('pt-BR');
		
 		 Meteor.call("newPool", {
	 		 	status: "E", 
	 		 	data_inicio: moment(new Date()).format( "MM-DD-YYYY HH:mm:ss.SSS"), 
	 		 	medico: 1,
	 		 	site: site
 		 	},function(err){
			if(err) {
				alert(err)
			}
		}); 
	}
});