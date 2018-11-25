const startPageHtml = '\
			<h1>desktop-app</h1><hr>\
			<p>\
				Welcome to Gantt Chart Tool.  \
			</p>\
			<p>\
				Start a new project <br>or open an existing one by selecting <br />the right <code>JSON</code> configuration. \
			</p>\
			<a href="#" class="btn btn-primary" onclick="readFileDialog()">\
				<i class="fa fa-folder-open"></i>\
				Open a project\
			</a>\
			<a href="#" class="btn btn-primary" onclick="newProject()">\
				<i class="fa fa-certificate"></i>\
				New project\
			</a><hr>\
			';


function startPage(){
	if (currentFilePath == null){
		$("emptyConfBtn").innerHTML = startPageHtml;
		return true;
	}
	else{
		return false;	
	} 
}
