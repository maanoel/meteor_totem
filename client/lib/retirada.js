Template.retirada.helpers({

	nextPass: function(){

		let nextPass = Retirada.find({}).fetch()[0]? Retirada.find({}).fetch()[0].count : null;

		if(!nextPass){

			  nextPass = 0;
			  Meteor.call("newToch",{}, function (err){
			 	if(err) alert(err);
			 })
		}

		console.log(nextPass);
		return Number(nextPass) + 1;

	}
});

Template.retirada.events({

	"click button": function(e,template){

		let newPass = e.target.id;

		Meteor.call("passIncrement",{}, function (err){
		 	if(err) alert(err);
		 });

		function callback(){
			console.log("retirada.js");
			let chamadas = Chamadas.find({medico : 1}).fetch();
			definirTableView(chamadas);
		}

		Meteor.call("newPool", 
			{senha: newPass, status: "E", data_inicio: new Date(), medico: 1}, callback);
	} 

});