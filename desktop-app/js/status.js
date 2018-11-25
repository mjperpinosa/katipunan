// status bar


/**
 * Add a message on footer navbar
 * 3 positions avalaible :
 *
 * - left 
 * - middle
 * - right 
 * 
 * @param {String} messsage : the messsage
 * @param {String} position : the position
 */
function addStatus(messsage, position){
	var col = $('footer-col-'+position);
	col.innerHTML = messsage;
}

/**
 * RAZ footer navbar on a specific pos
 * 
 * @param {String} position : the position
 */
function clearStatus(position){
	$('footer-col-'+position).innerHTML = null;
}

/**
 * RAZ all navbar (every position)
 */
function clearAllStatus(){
	$('footer-col-left').innerHTML   = null;
	$('footer-col-middle').innerHTML = null;
	$('footer-col-right').innerHTML  = null;
}

/**
 * Send a push message (3s)
 * @param {String} messsage : the messsage
 * @param {String} position : the position
 */
function pushMessage(mes,pos){
	addStatus(mes, pos);
	setTimeout(function () {
		clearStatus(pos);     
	}, 3000);
}

/**
 * Send a push message for n seconds
 * @param {String} messsage : the messsage
 * @param {String} position : the position
 */
function pushMessageSec(mes,pos,milliseconds){
	addStatus(mes, pos);
	setTimeout(function () {
		clearStatus(pos);     
	}, milliseconds);
}