var app = require('electron').remote; 
var dialog = app.dialog;
var fs = require('fs'); 
var currentFilePath = null;
var undoJSON = null;
var options={
			  filters: [
			    {name: 'JSON Project File', extensions: ['json']},
			    {name: 'All Files', extensions: ['*']}
			  ]
			};


function $(id) { return document.getElementById(id); };

/* CREATING A FILE */
function createFile(content){
	/*let content = "Some text to save into the file";*/
	// You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
	dialog.showSaveDialog(options,(fileName) => {
		if (fileName === undefined){
			console.log("You didn't save the file");
			return;
		}
		// fileName is a string that contains the path and filename created in the save file dialog.  
		fs.writeFile(fileName, content, (err) => {
			if(err){
				alert("An error ocurred creating the file "+ err.message)
			}
			//alert("The file has been succesfully saved");
		});
		console.log(fileName);
		currentFilePath=fileName;
	});
}

/**
 * Save without prompt a dialog window
 * @param  {[type]} filePath [description]
 * @param  {[type]} content  [description]
 * @return {[type]}          [description]
 */
function saveFileIn(filePath, content){
	// filePath is a string that contains the path and filename created in the save file dialog.  
	fs.writeFile(filePath, content, (err) => {
		if(err){
			alert("An error ocurred creating the file "+ err.message)
		}
					
		alert("The file has been succesfully saved");
	});
}



/* READ FILE CONTENT */
function readFileDialog(filepath){
	dialog.showOpenDialog(options,(filepath) => {
		// filepath is an array that contains all the selected
		if(filepath === undefined){
			console.log("No file selected");
			return;
		}

		fs.readFile(filepath[0], 'utf-8', (err, data) => {
			if(err){
				alert("An error ocurred reading the file :" + err.message);
				return;
			}
			console.log("The file content is : " + data);
			currentFilePath = filepath[0];
			undoJSON = null;
			drawChart();
			document.getElementById("emptyConfBtn").innerHTML = null;
			return data;
		});
	});
}


function readFile(filepath){
	fs.readFileSync(filepath, 'utf-8', (err, data) => {
		if(err){
			alert("An error ocurred reading the file :" + err.message);
			return;
		}
		console.log("The file content is : " + data);
		return data;
	});
}



function updateFile(filepath, content){
	fs.writeFile(filepath, content, (err) => {
		if (err) {
			alert("An error ocurred updating the file" + err.message);
			console.log(err);
			return;
		}

		//alert("The file has been succesfully saved");
	});
}




/* DELETE A FILE */
function deleteFile(filepath){
	if (fs.existsSync(filepath)) {
	fs.unlink(filepath, (err) => {
		if (err) {
			alert("An error ocurred updating the file" + err.message);
			console.log(err);
			return;
		}
		console.log("File succesfully deleted");
	});
	} else {
		alert("This file doesn't exist, cannot delete");
	}
}



