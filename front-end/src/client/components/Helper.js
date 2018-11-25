const GET_PROJECTS = 'http://192.168.43.15:9000/api';

export const CREATE_PROJECT = async (event, id) => {
	console.log(event, id);
	const { title, description } = event.target;
	return await fetch(`${GET_PROJECTS}/create_project?title=${title.value}&description=${description.value}&id=${id}`,
		{
			headers: {
				'Accept': 'application/json',
	  		'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(response => response);
};

export const CREATE_TASK = async (event, id) => {
	event.preventDefault();
	const { task, deadline, priority } = event.target;
	return await fetch(
		`${GET_PROJECTS}/create_task?id=${id}&task=${task.value}&deadline=${deadline.value}&priority_points=${priority.value}`,
		{
			headers: {
				'Accept': 'application/json',
	  		'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(response => response);
};

export const FETCH_PROJECTS = async () => {
	return await fetch(`${GET_PROJECTS}/get_projects`, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(response => response);
}

export const VIEW_RPOJECT = async (id) => {
	return await fetch(`${GET_PROJECTS}/view_project?id=${id}`, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(response => response);
}

export const SIGN_UP = async (event) => {
	event.preventDefault();
	const { username, password, lname, fname } = event.target;
	return await fetch(`${GET_PROJECTS}/sign_up?username=${username.value}&password=${password.value}&last_name=${lname.value}&first_name=${fname.value}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	})
		.then(response => response.json())
		.then(response => response);
}

export const SIGN_IN = async (event) => {
	event.preventDefault();
	const { username, password, lname, fname } = event.target;
	return await fetch(`${GET_PROJECTS}/login?username=${username.value}&password=${password.value}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	})
		.then(response => response.json())
		.then(response => response);
}

export const ADD_EMPLOYEE = async (taskid, employeeid) => {
	event.preventDefault();
	return await fetch(`${GET_PROJECTS}/assign_task_to_employee?task_id=${taskid}&employee_id=${employeeid}`,
		{
			headers: {
				'Accept': 'application/json',
	  		'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(response => response);
};

export const FETCH_USER_TASKS = async (id) => {
	return await fetch(`${GET_PROJECTS}/get_employee_tasks?id=${id}`, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(response => response);
};

export const CHANGE_STATUS = async (status, task) => {
	return await fetch(`${GET_PROJECTS}/change_task_status?status=${status}&task_id=${task}`, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(response => response);
};

