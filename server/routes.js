Router.map(function(){

	this.route("home", {

		path: "/",
		template: "home",
		layoutTemplate: "homeTemplate"
		
	});

	this.route("fila", {
		path: "/fila",
		template: "fila",
		layoutTemplate : "filaTemplate",
		data: function(){
			console.log("processando rota");
	        return Chamadas.find({medico: 1},{sort: {data_inicio: -1}}).fetch();
  		 }
	});

	this.route("chamada", {
		path: "/chamada",
		template: "chamada",
		layoutTemplate: "chamadaTemplate"

	});

	this.route("retirada", {
		path: "/retirada",
		template: "retirada",
		layoutTemplate: "retiradaTemplate"
	}); 

	this.route("notLogged", {
		path: "/notLogged",
		template: "notLogged",
		layoutTemplate: "notLoggedTemplate"
	}); 

});

//Caso o usuário não esteja logado, redireciona
Router.onBeforeAction(function() {
    if (!Meteor.userId() && this.ready()){
    	console.log(00001);
        return this.redirect('/');
     }else{
     	this.next();
     }
}, {except: ['home']});