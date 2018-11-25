const GET_PROJECTS = 'http://192.168.43.15:8000/api';

export const CREATE_PROJECT = async (event) => {
	event.preventDefault();
	const { title, description } = event.target;
	return await fetch(`${GET_PROJECTS}/create_project?title=${title.value}&description=${description.value}`,
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

