(function () {
	const module = {
		list: [],
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
			this.listTask.addEventListener('click', this.deleteTask.bind(this));
			this.listTask.addEventListener('click', this.editTask.bind(this));
		},

		taskElement: function (taskValue) {
			const listItem = document.createElement('li');
			listItem.classList.add('containerTasks-item');

			const label = document.createElement('label');

			const containerIcons = document.createElement('div');
			const checkInput = document.createElement('input');
			const editButton = document.createElement('button');
			const deleteButton = document.createElement('button');
			const editIcon = document.createElement('i');
			const deleteIcon = document.createElement('i');

			label.classList.add('text');
			containerIcons.classList.add('containerIcon');
			checkInput.classList.add('checkItem');
			checkInput.setAttribute('type', 'checkbox');
			// editButton.setAttribute('id', 'editButton');
			editButton.setAttribute('type', 'button');
			editButton.classList.add('button', 'icon', 'edite');
			// deleteButton.setAttribute('id', 'deleteButton');
			deleteButton.classList.add('button', 'icon', 'delete');
			editIcon.classList.add('fa-solid', 'fa-pen-to-square');
			deleteIcon.classList.add('fa-solid', 'fa-trash-can');

			label.innerText = taskValue;

			editButton.appendChild(editIcon);
			deleteButton.appendChild(deleteIcon);
			containerIcons.appendChild(editButton);
			containerIcons.appendChild(deleteButton);

			listItem.appendChild(checkInput);
			listItem.appendChild(label);
			listItem.appendChild(containerIcons);

			this.list.push(label.textContent);

			this.list.forEach((element, index) => {
				editButton.setAttribute('id', index);
				editIcon.setAttribute('id', index);
				deleteButton.setAttribute('id', index);
				deleteIcon.setAttribute('id', index);
				listItem.setAttribute('id', index);
			});
			this.listTask.appendChild(listItem);
			this.setTaskStorage(this.list);

			// console.log(this.list);
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
			let elementId = Number(e.target.id);
			if (e.target.classList.contains('delete') || e.target.classList.contains('fa-trash-can')) {
				// this.list.splice(elementId, 1);
				let deleteItem = this.list.filter((element, index) => index !== elementId);
				this.list = deleteItem;
				this.setTaskStorage(this.list);
				this.cleanHTML();
				this.showTasks();
			}
		},
		showTasks: function () {
			this.getTaskStorage();
			let li = '';
			this.list.forEach((element, index) => {
				li += `<li id=${index} class="containerTasks-item"><input type="checkbox" class="checkItem"><label class="text">${element}</label>
				<div class="containerIcon">
				<button id=${index} class="button icon edite" type="button">
				<i class="fa-solid fa-pen-to-square" id=${index}></i>
				</button>
				<button id=${index} class="button icon delete" type="button">
				<i class="fa-solid fa-trash-can" id=${index}></i>
				</button>
				</div>
				</li>`;

				this.listTask.innerHTML = li;
			});
		},
		cleanHTML: function () {
			while (this.listTask.firstChild) {
				this.listTask.removeChild(this.listTask.firstChild);
			}
		},
	};
	module.init();
})();
