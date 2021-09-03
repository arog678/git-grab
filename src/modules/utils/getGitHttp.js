export async function getHttpRequest(url, type) {
	return new Promise((res) => {
		
	fetch(url, {headers: {
		"Accept": "application/vnd.github.mercy-preview+json"
	  }})
	.then(async response => {
		const resp = await response.json();
		if (type === "topic") {
			res(trimProjectData(resp));
		} else {
			res(trimUserData(resp));
		}
	})
  

	});
}

export function trimProjectData(projectResponseText) {
	const projectData = [];
	for (const data of projectResponseText.items) {
		const trimmedData = {
			id: data.name,
			name: data.display_name === null ? data.name : data.display_name,
			url: "https://github.com/topics/" + data.name,
			createdAt: data.created_at,
			updatedAt: data.updated_at,
			released: "2008",
			desc: data.short_description,
			decsLong: data.description,
			saved: false,
			//userImg: data.owner.avatar_url,
			//userName: data.owner.login,
			//userLink: data.owner.html_url,
			type: "topic"
		};
		projectData.push(trimmedData);
	}
	
	return {items: projectData, resp: projectResponseText};
}

export function trimUserData(userResponseText) {
	const projectData = [];
	for (const data of userResponseText.items) {
		const trimmedData = {
			id: data.id,
			name: data.login,
			url: data.html_url,
			userImg: data.avatar_url,
			type: "user",
			saved: false
		
		};
		projectData.push(trimmedData);
	}
	
	return {items: projectData, resp: userResponseText};
}

export function getUserDetails(username) {
	return new Promise((res) => {
		const url = "https://api.github.com/users/" + username;

		fetch(url)
		.then(async response => {
			const resp = await response.json();
			const data = resp;
			const userData = {
				id: data.id,
				username: data.login,
				name: data.name,
				url: data.html_url,
				userImg: data.avatar_url,
				publicRepos: data.public_repos,
				publicGists: data.public_gists,
				followers: data.followers,
				following: data.following,
				company: data.company,
				blog: data.blog,
				email: data.email,
				bio: data.bio,
				type: "user"
			
			};
			res(userData);

		});
	});
	
	
}


export function getProjectDetails(projectID) {
	return new Promise((res) => {
		const url = "https://api.github.com/projects/" + projectID;

		fetch(url, {
			org: 'org',
			mediaType: {
				previews: [
					'inertia'
				]
			}
		}).then(async response => {
			const resp = await response.json();
			const data = resp;
			const userData = {
				name: data.display_name,
				desc: data.short_description,
				longDesc: data.description,
				id: projectID,
				createdAt: data.created_at,
				updatedAt: data.updated_at,
				//userImg: data.owner.avatar_url,
				//userName: data.owner.login,
				//userLink: data.owner.html_url,
				type: "topic"
			
			};
			res(userData);

		});
	});
	
	
}