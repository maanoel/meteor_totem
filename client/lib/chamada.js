Template.chamada.helpers({
	currentPass: function (){
		s.play();

		
		let start = new Date(),
			end = new Date();

		start.setHours(0,0,0,0);
		end.setHours(23,59,59,999);

		let senha = Pass.find({
			 
		}).fetch()[0]? Pass.find({}).fetch()[0].senha : null;

		if( senha ) 
			Session.set("currentPass", senha);
		else	
			senha = '-';
				  
		
		
		return senha;
	}
});

const s = new buzz.sound('/client/configs/sounds/truck.ogg',{
    formats: [ "ogg", "mp3", "aac", "wav" ],
    preload: true,
    autoplay: true,
    loop: false
});
 