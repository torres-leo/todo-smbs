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
			this.buttonDel = document.getElementById('deleteButton');
			this.buttonEdit = document.getElementById('editButton');
		},
		bindingEvents: function () {
			this.button.addEventListener('click', this.addTask.bind(this));
			this.buttonEdit?.addEventListener('click', this.editTask.bind(this));
			this.buttonDel?.addEventListener('click', this.deleteTask.bind(this));
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
			editButton.setAttribute('id', 'editButton');
			editButton.setAttribute('type', 'button');
			editButton.classList.add('button', 'icon', 'edite');
			deleteButton.setAttribute('id', 'deleteButton');
			deleteButton.classList.add('button', 'icon', 'delete');
			editIcon.classList.add('fa-solid', 'fa-pen-to-square');
			deleteIcon.classList.add('fa-solid', 'fa-trash-can');

			label.innerText = taskValue;

			this.listTask.appendChild(listItem);
			editButton.appendChild(editIcon);
			deleteButton.appendChild(deleteIcon);
			containerIcons.appendChild(editButton);
			containerIcons.appendChild(deleteButton);

			listItem.dataset.id;
			listItem.appendChild(label);
			listItem.appendChild(containerIcons);

			const id = Date.now().toString();

			this.list.push({ id, taskValue });
			console.log(this.list);
		},
		addTask: function (e) {
			e.preventDefault();

			if (this.input.value === '') {
				alert("can't send an empty task");
			} else {
				this.taskElement(this.input.value);
			}
			this.input.value = '';

			const deleteButton = document.getElementById('deleteButton');
			deleteButton.onclick = (e) => {
				// console.log(e.target.parentElement.parentElement);
				let li = e.target.parentElement.parentElement;
				let ul = li.parentElement;

				ul.removeChild(li);
			};
			// const editButton = document.getElementById('editButton');
			// editButton.onclick = (e) => {
			// 	console.log(e.target.parentElement.parentElement);
			// };
		},

		editTask: function () {},
	};
	module.init();
})();
