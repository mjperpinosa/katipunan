function hideModal() {
	$('modalForm').style.height ='1px';
	$('close-modal').style.visibility ='hidden'; 
	setTimeout(function(){ 
		$('modalForm').style.visibility ='hidden'; 
		//$('modalForm').className =null;
	}, 200);
	resetModal();
}

function showModal(parameter) {
	$('modalForm').style.visibility ='visible';
	$('close-modal').style.visibility ='visible';
	$('modalForm').style.height = resizeModalHandler();
	$('modalForm').className ="col-md-6 push-md-3";
	if (parameter == 'edit') {
		$('saveTaskBtn').onclick = function(){
			//editTask(); 
			addAlert("Edit a task",
				"You are about to edit a task. Are you sure to edit this task ?",
				["Yes","Cancel"],
				editTask);
		}
		$('saveTaskBtn').innerHTML   = "Edit <i class='fa fa-edit'></i>";
		$('deleteTaskBtn').style.visibility ='visible'; 
		$('deleteTaskBtn').onclick = function(){
			deleteTask();
		}; 
		// = "<i class='fa fa-trash'></i>";
	}
}


function resetModal() {
	$("formTask").reset();
	$('saveTaskBtn').onclick = function(){
		addTask();
		hideModal();
	}
	$('saveTaskBtn').innerHTML = "New task <i class='fa fa-plus'></i>";
	$('taskId').innerHTML = "Title";
	$('deleteTaskBtn').style.visibility ='hidden'; 
}

function documentHeight() {
    return Math.max(
        window.innerHeight,
        document.documentElement.clientHeight
    );
}

function resizeModalHandler(){
	var h = documentHeight()-130;
	$('modalForm').style.height = ""+h+"px";
	console.log( ""+h+"px");
}

