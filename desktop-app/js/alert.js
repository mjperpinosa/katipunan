const yesno=[];

/**
 * Adding an alert to the wrapper element.
 * You can specify several elements such as :
 *
 * - Alert Title
 * - Alert Body (can be some HTML as a string)
 * - an array contening the YES button message and the NO button message (in this order)
 * 
 * @param String title the alert title
 * @param String body  the alert body
 * @param Array  yesno array of String - 2 elements needed
 */
function addAlert(title, body, yesno, callback){
	if ($('alert')) {
		$('alert').remove();
	}
	var alert = document.createElement('div');
	alert.setAttribute("id","alert")
	alert.setAttribute("class","col-md-4 push-md-4")
	alert.innerHTML = "\
					<div id='alert-header' class='text-center'>\
						"+title+"\
					</div>\
					<div class='alert-body'>\
						"+body+"\
					</div>\
					<div id='alert-footer'>\
						<a href='#' class='btn btn-close-alert' onclick='closeAlert()'>\
							"+yesno[1]+"\
						</a>\
						<a href='#' id='saveTaskBtn' class='btn btn-ok-alert'\
								 onclick='okAlert("+ callback +")'>\
							"+yesno[0]+"\
						</a>\
					</div>";
	$('wrapper').appendChild(alert);
	fadeIn(alert);
}

/**
 * Closing the alert div with fadeOut effect and remove the element
 * @return {[type]} [description]
 */
function closeAlert(){
	var alert = $('alert');
	if (alert) {
		fadeOut(alert);
	}
	setTimeout(function(){
		$('alert').remove();
	},1000);
}

/**
 * Close the alert, and call the callback function passed in addAlert()
 * @param  {Function} callback 
 */
function okAlert(callback){
	callback();
	$('alert').remove();
}

/**
 * fadeIn effect on an element
 * @param  Object element [description]
 */
function fadeIn(el) {
  el.style.opacity = 0;
  var tick = function() {
    el.style.opacity = +el.style.opacity + 0.1;
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 100)
    }
  };
  tick();
}

/**
 * fadeOut effect on an element
 * @param  Object element [description]
 */
function fadeOut(el) {
  el.style.opacity = 1;
  var tick = function() {
    el.style.opacity = +el.style.opacity - 0.1;
    if (+el.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 100)
    }
  };
  tick();
}