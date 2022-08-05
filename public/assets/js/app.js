(function () {
	const module = {
		list: [],
		isEditing: false,
		init: function () {
			this.cacheDom();
			this.bindingEvents();
			this.showTasks();
		},

		cacheDom: function () {
			this.listTask = document.getElementById('containerTasks');
			this.button = document.getElementById('buttonAdd');
			this.input = document.getElementById('task');
		},

		bindingEvents: function () {
			this.button.addEventListener('click', this.addTask.bind(this));
		},

		taskElement: function (taskValue, index) {
			const listItem = document.createElement('li');
			listItem.classList.add('Task-item');

			const label = document.createElement('label');

			const containerIcons = document.createElement('div');
			const checkInput = document.createElement('input');
			const editButton = document.createElement('button');
			const deleteButton = document.createElement('button');
			const editIcon = document.createElement('i');
			const deleteIcon = document.createElement('i');

			label.classList.add('text');
			containerIcons.classList.add('TaskButton-wrapper');
			checkInput.classList.add('Task-check');
			checkInput.setAttribute('type', 'checkbox');
			editButton.setAttribute('type', 'button');
			editButton.classList.add('button', 'icon', 'edite');
			deleteButton.classList.add('button', 'icon', 'delete');
			editIcon.classList.add('fa-solid', 'fa-pen-to-square');
			deleteIcon.classList.add('fa-solid', 'fa-trash-can');

			editButton.addEventListener('click', this.editTask.bind(this));
			deleteButton.addEventListener('click', this.deleteTask.bind(this));

			label.innerText = taskValue;

			editButton.appendChild(editIcon);
			deleteButton.appendChild(deleteIcon);
			containerIcons.appendChild(editButton);
			containerIcons.appendChild(deleteButton);

			listItem.appendChild(checkInput);
			listItem.appendChild(label);
			listItem.appendChild(containerIcons);

			editButton.setAttribute('id', index);
			editIcon.setAttribute('id', index);
			deleteButton.setAttribute('id', index);
			deleteIcon.setAttribute('id', index);
			listItem.setAttribute('id', index);

			this.listTask.appendChild(listItem);
		},
		setTaskStorage: function () {
			localStorage.setItem('todoItems', JSON.stringify(this.list));
		},
		getTaskStorage: function () {
			let listItem = JSON.parse(localStorage.getItem('todoItems'));
			if (!listItem) {
				return [];
			}
			return listItem;
		},
		addTask: function (e) {
			e.preventDefault();
			if (!this.input.value) {
				alert("can't send an empty task");
				return;
			}
			if (this.isEditing) {
				this.button.innerText = 'Add Task';
				this.list[this.elementId] = this.input.value;
				this.isEditing = false;
				this.elementId = null;
			} else {
				this.taskElement(this.input.value, this.list.length);
				this.list.push(this.input.value);
			}
			this.setTaskStorage();
			this.input.value = '';
			this.showTasks();
		},

		editTask: function (e) {
			const elementId = Number(e.target.id);
			this.input.value = this.list[elementId];

			this.isEditing = true;
			this.elementId = elementId;

			this.button.innerText = 'Save';
			this.setTaskStorage();
			this.showTasks();
		},
		deleteTask: function (e) {
			const elementId = Number(e.target.id);

			let deleteItem = this.list.filter((element, index) => index !== elementId);
			this.list = deleteItem;
			this.setTaskStorage();
			this.showTasks();
		},
		showTasks: function () {
			this.listTask.innerHTML = '';
			this.list = this.getTaskStorage();
			this.list.forEach((element, index) => {
				this.taskElement(element, index);
			});
		},
	};
	module.init();
})();
