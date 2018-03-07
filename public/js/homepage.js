var newToSend;
$( document ).ready(function(){
				$('select').material_select();

				$(".button-collapse").sideNav();

				$("#new-tag").click(function(){
					var newTag = prompt("Add a new tag:");
					$('#newtags').append("<input type=\"checkbox\" class=\"filled-in\" id=\"filled-in-box6\" /><label class=\"check-label\" for=\"filled-in-box6\">" + newTag + "</label>");
				});

				$.post('/addact').then(function(response) {
    					if (response.success) {
        						console.log('Your message was sent');
    					} 
    					else {
        						console.log(response.user.local.email);
    					}
				}).catch(function(err) {
    					console.log('Could not reach server');
				});

				// $('#add-activity').click(function(){
				// 	var newActivity = prompt("Add new Activity:");
				// 	newToSend = newActivity;
				// 	$.post('addActivity',  function() {console.log("posted")})
				// 	.done(function postCallback(res){
  		// 				console.log('Update done')
  		// 				$('.dropdown-content').append("<li><span>" + newActivity + "</span></li>");
  		// 			});
				// });

				});