(function () {
	const module = {
		list: [],
		init: function () {
			this.cacheDom();
			this.bindingEvents();
		},
		cacheDom: function () {
			this.listTask = document.getElementById('containerTasks');
			this.button = document.getElementById('buttonAdd');
			this.input = document.getElementById('task');
		},
		bindingEvents: function () {
			this.button.addEventListener('click', this.addTask.bind(this));
		},
		taskElement: function (taskValue) {
			const listItem = document.createElement('li');
			listItem.classList.add('containerTasks-item');

			const label = document.createElement('label');

			const containerIcons = document.createElement('div');
			const editButton = document.createElement('button');
			const deleteButton = document.createElement('button');
			const editIcon = document.createElement('i');
			const deleteIcon = document.createElement('i');

			containerIcons.classList.add('containerIcon');
			editButton.classList.add('button', 'icon', 'edite');
			deleteButton.classList.add('button', 'icon', 'delete');
			editIcon.classList.add('fa-solid', 'fa-pen-to-square');
			deleteIcon.classList.add('fa-solid', 'fa-trash-can');

			label.innerText = taskValue;

			this.listTask.appendChild(listItem);
			editButton.appendChild(editIcon);
			deleteButton.appendChild(deleteIcon);
			containerIcons.appendChild(editButton);
			containerIcons.appendChild(deleteButton);

			listItem.appendChild(label);
			listItem.appendChild(containerIcons);

			return listItem;
		},
		addTask: function () {
			this.taskElement(this.input.value);
		},
	};
	module.init();
})();
