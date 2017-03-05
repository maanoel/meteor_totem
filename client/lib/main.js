Template.home.events({

	'click #limpar' : function(){

		if(confirm("Vai mesmo excluir tudo?"))
		{
			Meteor.call("cleanMongo", {}, function(err){
				if(err) alert(err)
				else
					alert("Dados excluidos com sucesso!");
			});
		}
	}

});