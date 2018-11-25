function undo(){
	if (!currentFilePath || !undoJSON) {
		return;
	}
	updateFile(currentFilePath, undoJSON);
	setTimeout(function(){ 
		drawChart();
	}, 1000);
}

/**
 * Adding a new task at the end of the JSON conf file
 */
function addTask(){
	if (currentFilePath == null) {
		return;
	}
	var title            = document.getElementById("title").value;
	var resource         = document.getElementById("resource").value;
	var startdate        = document.getElementById("startdate").value;
	var enddate          = document.getElementById("enddate").value;
	var dependencies     = document.getElementById("dependencies").value;
	var dependencies     = document.getElementById("dependencies").value;
	var percent_complete = document.getElementById("percent_complete").value;

	var file = fs.readFileSync(currentFilePath, "utf8");
	var arr  = JSON.parse(file);

	var lastId = arr.tasks[arr.tasks.length-1].task_id;

	var newTask = 
		{
		    "task_id"             :(parseInt(lastId)+1).toString(),
			"task_name"           :title,
			"resource"            :resource,
			"start_date"          :startdate,
			"end_date"            :enddate,
			"duration"            :null, 
			"percent_complete"    :parseInt(percent_complete),
			"dependencies"        :dependencies
		};

	try {
	   checkTaskIntegrity(newTask);
	} catch (e) {
	  	addAlert(e.name, e.message, ["OK","Cancel"],()=>{});
	  	return; 
	}
	
	arr.tasks.push(newTask);
	var newFile = JSON.stringify(arr, null, 2);
	undoJSON=file;
	updateFile(currentFilePath, newFile);
	setTimeout(function(){ 
		drawChart();
	}, 1000);
	pushMessage("Task added sucessfully",'left');
}


/**
 * Getting back the information from the selected row and build the form for edition
 * @param  Integer rowNumber  the row number
 */
function renderEditTaskForm(rowNumber){
	if (currentFilePath == null) {
		return;
	}
	
	var file = fs.readFileSync(currentFilePath, "utf8");
	var arr = JSON.parse(file);

	var task = arr.tasks[rowNumber];
	
	document.getElementById("taskId").innerHTML       = "Title of task <strong>#" + task.task_id +"</strong>";
	document.getElementById("idTask").value           = task.task_id;
	document.getElementById("title").value            = task.task_name;
	document.getElementById("resource").value         = task.resource;
	document.getElementById("startdate").value        = task.start_date.toString();
	document.getElementById("enddate").value          = task.end_date;
	document.getElementById("dependencies").value     = task.dependencies;
	document.getElementById("percent_complete").value = task.percent_complete;

	showModal('edit');
}

/**
 * After Modifying the EditTaskForm, save the existing task
 */
function editTask(){
	if (currentFilePath == null) {
		return;
	}
	
	var file = fs.readFileSync(currentFilePath, "utf8");
	var arr = JSON.parse(file);

	var idTask           = document.getElementById("idTask").value;
	var title            = document.getElementById("title").value;
	var resource         = document.getElementById("resource").value;
	var startdate        = document.getElementById("startdate").value;
	var enddate          = document.getElementById("enddate").value;
	var percent_complete = document.getElementById("percent_complete").value;
	var dependencies     = document.getElementById("dependencies").value;

	var newTask = 
		{
		    "task_id"         :idTask,
		    "task_name"       :title,
		    "resource"        :resource,
		    "start_date"      :startdate,
		    "end_date"        :enddate,
		    "duration"        :null, 
		    "percent_complete":parseInt(percent_complete),
		    "dependencies"    :dependencies
		};

	for(task in arr.tasks){
		if (arr.tasks[task].task_id == idTask) {
			arr.tasks[task] = newTask;
		}
	} 

	var newFile = JSON.stringify(arr, null, 2);
	undoJSON=file;
	updateFile(currentFilePath, newFile);
	setTimeout(function(){ 
		drawChart();
		hideModal();
		resetModal();
	}, 1000);
}

function deleteTask(){
	if (currentFilePath == null) {
		return;
	}

	var title = "Delete a task";
	var body  = "You are about to delete a task. Are you sure to delete this task ?";
	var yesno = ["Yes","Cancel"];

	addAlert(title, body, yesno, ()=>{
		var file = fs.readFileSync(currentFilePath, "utf8");
		var arr = JSON.parse(file);

		var idTask = document.getElementById("idTask").value;

		for(rowNumber in arr.tasks){
			if (arr.tasks[rowNumber].task_id == idTask) {
				arr.tasks.splice(rowNumber, 1);
			}
		} 

		var newFile = JSON.stringify(arr, null, 2);
		undoJSON=file;
		updateFile(currentFilePath, newFile);
		setTimeout(function(){ 
			drawChart();
			hideModal();
			resetModal();
		}, 1000);
	});
	
	
}


function TaskException(message){
	this.message = message;
	this.name    = "TaskException";
}


function checkTaskIntegrity(t){

	if (!t.task_name) {
		throw new TaskException('The task name cannot be empty or null.\
		 Please try again filling the task name input.') ;
	}
	if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(t.start_date)) {
		throw new TaskException('Wrong date format. The date have to be in the <code>YYYY-MM-DD</code> format') ;
	}
	if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(t.end_date)) {
		throw new TaskException('Wrong date format. The date have to be in the <code>YYYY-MM-DD</code> format') ;
	}
	if (!t.percent_complete) {
		t.percent_complete = 0;
	}
	if (t.dependencies == '') {
		t.dependencies = null;
	}
	/*task_name
	resource
	start_date
	end_date
	duration
	percent_complete
	dependencies*/

}


