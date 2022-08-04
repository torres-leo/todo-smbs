(function () {
	const module = {
		list: [],
		init: function () {
			this.cacheDom();
			this.bindingEvents();
			this.showTask();
		},
		cacheDom: function () {
			this.listTask = document.getElementById('containerTasks');
			this.button = document.getElementById('buttonAdd');
			this.input = document.getElementById('task');
		},
		bindingEvents: function () {
			this.button.addEventListener('click', this.addTask.bind(this));
			this.listTask.addEventListener('click', this.deleteTask.bind(this));
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

			editButton.appendChild(editIcon);
			deleteButton.appendChild(deleteIcon);
			containerIcons.appendChild(editButton);
			containerIcons.appendChild(deleteButton);

			this.list.push(label.textContent);

			this.list.forEach((element, index) => {});

			listItem.appendChild(label);
			listItem.appendChild(containerIcons);
			this.listTask.appendChild(listItem);

			console.log(listItem);
			this.setTaskStorage(this.list);

			// this.getTaskStorage('todoItems');
		},
		setTaskStorage: function (list) {
			localStorage.setItem('todoItems', JSON.stringify(list));
		},
		getTaskStorage: function () {
			let listItem = localStorage.getItem('todoItems');
			if (listItem === 'undefined' || listItem === null) {
				this.list = [];
			} else {
				this.list = JSON.parse(listItem);
			}
			// console.log(listItem);
		},
		addTask: function (e) {
			e.preventDefault();

			if (this.input.value === '') {
				alert("can't send an empty task");
			} else {
				this.taskElement(this.input.value);
			}
			this.input.value = '';
		},

		editTask: function () {
			console.log('Hola');
		},
		deleteTask: function (e) {
			const elementLi = e.target.parentElement.parentElement;
			const idElement = Number(elementLi.id);

			console.log(idElement);

			this.list.splice(idElement, 1);
			this.setTaskStorage(this.list);
			this.showTask();
		},
		showTask: function () {
			this.getTaskStorage();
			let li = '';
			this.list.forEach((element, index) => {
				li += `<li id=${index} class="containerTasks-item"><label>${element}</label>
				<div class="containerIcon">
				<button id="editButton" class="button icon edite" type="button">
				<i class="fa-solid fa-pen-to-square"></i>
				</button>
				<button id="deleteButton" class="button icon delete" type="button">
				<i class="fa-solid fa-trash-can"></i>
				</button>
				</div>
				</li>`;

				this.listTask.innerHTML = li;
			});
		},
	};
	module.init();
})();
