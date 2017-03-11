Template.chamada.helpers({
	currentPass: function (){
		s.play();

		let start = new Date(),
			end = new Date();

		start.setHours(0,0,0,0);
		end.setHours(23,59,59,999);

		let password = Pass.find({}).fetch()[0],
			senha = password ? password.senha : null 

		console.log(Pass.find({}).fetch());

		if( senha ) 
			Session.set("currentPass", senha);
		else	
			senha = '-';				  
		
		return senha;
	}
});

Template.chamada.helpers({
	currentLocal: function (){

		let password = Pass.find({}).fetch()[0];

		site = password ? password.site : null;
	
		if( site ) 
			Session.set("currentLocal", site);
		else	
			site = '-';				  
		
		
		return site;
	}
});


const s = new buzz.sound('/client/configs/sounds/truck.ogg',{
    formats: [ "ogg", "mp3", "aac", "wav" ],
    preload: true,
    autoplay: true,
    loop: false
});
 