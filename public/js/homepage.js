var newToSend;
$( document ).ready(function(){
				$('select').material_select();

				$(".button-collapse").sideNav();

				$("#new-tag").click(function(){
					var newTag = prompt("Add a new tag:");
					$('#newtags').append("<input type=\"checkbox\" class=\"filled-in\" id=\"filled-in-box6\" /><label class=\"check-label\" for=\"filled-in-box6\">" + newTag + "</label>");
				});

				$('#add-activity').click(function(){
					var newActivity = prompt("Add new Activity:");
					newToSend = newActivity;
					$.post('addActivity',
					{
						name:newActivity
					}, postCallback);
				});
					function postCallback(res){
  						alert("Activity successfully submitted!");
  						$('.dropdown-content').append("<li><span>" + newActivity + "</span></li>");
  					}

				});