/**
 * Visit the Google Chart page for more information (API & examples)
 * https://developers.google.com/chart/interactive/docs/gallery/ganttchart
 */


google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);


/**
 * Convert Day to daysToMilliseconds
 * @param  Integer days : number of days
 * @return Integer      : equivalent number of milliseconds
 */
function daysToMilliseconds(days) {
	return days * 24 * 60 * 60 * 1000;
}

/**
 * Read a JSON Conf File, and make the Google Chart associated
 * @param String filepath  the path of the json file
 * @param Object chartData the chart Object to work with
 */
function addRowsFromJson(filepath, chartData) {
	var file = fs.readFileSync(filepath, "utf8");
	var arr = JSON.parse(file);

	// Get the project name and display it 
	var projectName = arr['project'];
	$('projectName').innerHTML = projectName + 
	' <a href="#" onclick="changeProjectName()" style="color:#888;font-size:0.8em;decoration:none">\
		<i class="fa fa-pencil"></i>\
	  </a>'; 

	var tasks = arr['tasks'];
	for(i in tasks){
		//tasks[i] = JSON.stringify(tasks[i]);
		for(j in tasks[i]){
			if(j == "start_date" || j == "end_date"){
				tasks[i][j] = new Date(tasks[i][j]);
			}
		}
	}
	var finalArray = [];
	var taskArray = [];
	for (i in tasks) {
		taskArray = [];
		for(j in tasks[i]){
			taskArray.push(tasks[i][j]);
		}
		finalArray[i]=taskArray;
	}
	chartData.addRows(finalArray);
}


/**
 * drawing Gantt chart using the following attributes :
 *
 * - Task ID          => (String)
 * - Task Name        => (String)
 * - Start Date       => (Date)
 * - End Date         => (Date)
 * - Duration         => (Float)
 * - Percent Complete => (Float)
 * - Dependencies     => (String)
 *
 * 
 * @return {[type]} [description]
 */
function drawChart() {

	if (startPage()) {
		return;
	}

	$("emptyConfBtn").innerHTML = null;

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Task ID');
	data.addColumn('string', 'Task Name');
	data.addColumn('string', 'Resource');
	data.addColumn('date', 'Start Date');
	data.addColumn('date', 'End Date');
	data.addColumn('number', 'Duration');
	data.addColumn('number', 'Percent Complete');
	data.addColumn('string', 'Dependencies');

	/**
	 * Gantt Chart Display Options
	 */
	var options = {
		gantt: {
			criticalPathEnabled: true,
			arrow: {
				angle: 50,
				width: 2,
				color: 'black',
				radius: 0
			},
			criticalPathStyle: {
				stroke: '#FF6363',
				strokeWidth: 3
			},
			barCornerRadius: 4,
			barHeight:15,
			trackHeight:30,
			labelStyle: {
				fontName: 'Helvetica',
				fontSize: 14,
				color: '#757575'
			}
		}
	};

	var chart = new google.visualization.Gantt($('chart_div'));

	/*
	------------------
	Methods avalaible:
	------------------

	- draw(data, options)	
		Draws the chart. The chart accepts further method calls only after the readyevent is fired.		Return Type: none
	- getSelection()	
		Returns an array of the selected chart entities. Selectable entities are bars, legend entries and categories. For this chart, only one entity can be selected at any given moment.
		Return Type: Array of selection elements
	- setSelection()	
		Selects the specified chart entities. Cancels any previous selection. Selectable entities are bars, legend entries and categories. For this chart, only one entity can be selected at a time.
		Return Type: none
	- clearChart()	
		Clears the chart, and releases all of its allocated resources.
		Return Type: none

	------------------
	 */
	chart.draw(data, options);
	addRowsFromJson(currentFilePath, data);

	function resizeHandler () {
        chart.draw(data, options);
    }
    if (window.addEventListener) {
        window.addEventListener('resize', resizeHandler, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onresize', resizeHandler);
    }

	/*google.visualization.events.addListener(chart, 'select',function() {
		var sel = chart.getSelection();
		console.log(sel);
	 	showModal();
	});*/

	google.visualization.events.addListener(chart, 'select', selectHandler);
    google.visualization.events.addListener(chart, 'onmouseover', saveSelection);

    var selectedItem; //custom selector

    function saveSelection(e) {
        selectedItem = { row:e.row,column:null};  //save selected item
    }

    function selectHandler() {
        //console.log(selectedItem);
        //console.log(selectedItem.row + " row has been selected"); 
        renderEditTaskForm(selectedItem.row);
    }
}
