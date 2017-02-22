Template.chamada.helpers({
	currentPass: function (){
		console.log(s);
		s.play();

		let start = new Date(),
			end = new Date();

		start.setHours(0,0,0,0);
		end.setHours(23,59,59,999);

		console.log(start);
		console.log(end);

		let senha = Pass.find({
			 
		}).fetch()[0]? Pass.find({}).fetch()[0].senha : null;

		if( senha ) Session.set("currentPass", senha);

		return senha;
	}
});

const s = new buzz.sound('/client/configs/sounds/truck.ogg',{
    formats: [ "ogg", "mp3", "aac", "wav" ],
    preload: true,
    autoplay: true,
    loop: false
});
 