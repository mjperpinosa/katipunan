function newProject(){

	var title ='New project';
	var body  ='Enter the new project name below';

	function addPromptAlert(title,body){
		var form = "\
			<form action='#' id='promptForm'>\
				<div class='form-group'>\
					<label for='promptInput'>"+body+"</label>\
					<input type='text' class='form-control' id='promptInput'\
					 placeholder='Enter text here' name='promptInput'>\
				</div>\
			</form>\
		";
		var pn = addAlert(title,form,["OK","Close"],function(){
			var promptContent = $("promptInput").value;
			console.log(promptContent);
			var skeleton = 
			{
			  "project": promptContent,
			  "tasks": [
			    {
			      "task_id": "1",
			      "task_name": "Add Task",
			      "resource": "Add Resource",
			      "start_date": "2017-06-10",
			      "end_date": "2017-08-30",
			      "duration": null,
			      "percent_complete": 0,
			      "dependencies": null
			    }
			  ]
			};
			currentFilePath = createFile(JSON.stringify(skeleton, null, 2));
			function drawWhenReady(){
				if (currentFilePath) {
					drawChart();
				}
				else{
					setTimeout(()=>{
						drawWhenReady();
					},1000);
				}
			}
			drawWhenReady();
		});
	}

	addPromptAlert(title,body);
};

function changeProjectName(){

	var title ='Edit Project Name';
	var body  ='Enter the new project name below';

	function addPromptAlert(title,body){
		if (currentFilePath == null) {
			return;
		}
		var file = fs.readFileSync(currentFilePath, "utf8");
		var arr = JSON.parse(file);
		var form = "\
			<form action='#' id='promptForm'>\
				<div class='form-group'>\
					<label for='promptInput'>"+body+"</label>\
					<input type='text' class='form-control' id='promptInput'\
					 value='"+arr.project+"' name='promptInput'>\
				</div>\
			</form>\
		";
		addAlert(title,form,["OK","Close"],function(){
			if (currentFilePath == null) {
				return;
			}
			var file = fs.readFileSync(currentFilePath, "utf8");
			var arr = JSON.parse(file);
			arr.project = $("promptInput").value;
			var newFile = JSON.stringify(arr, null, 2);
			updateFile(currentFilePath, newFile);
			setTimeout(function(){ 
				drawChart();
			}, 500);
		});
	}

	addPromptAlert(title,body);
};