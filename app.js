var taskInput = document.querySelector('#new-task');
var addButton = document.querySelector('#add-button');
var incompleteTask = document.querySelector('#incomplete-tasks');
var completedTasks = document.querySelector('#completed-tasks');

var createNewTaskElement = function (taskString) {

    var listItem = document.createElement('li');
    listItem.className = 'list__item';

    var checkBox = document.createElement('input');
    checkBox.className = 'list__item-checkbox';
    checkBox.type = 'checkbox';


    var label = document.createElement('label');
    label.className = 'list__item-label';
    label.innerText = taskString;

    var editInput = document.createElement('input');
    editInput.className = 'list__item-text';
    editInput.type = 'text';


    var editButton = document.createElement('button');
    editButton.className = 'button button_edit';
    editButton.innerText = 'Edit';


    var deleteButton = document.createElement('button');
    deleteButton.className = 'button button_delete';


    var deleteButtonImg = document.createElement('img');
    deleteButtonImg.className = 'delete-icon';
    deleteButtonImg.src = './remove.svg';

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function () {

    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTask.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';
}

var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('.list__item-text');
    var label = listItem.querySelector('.list__item-label');
    var editBtn = listItem.querySelector('.button_edit');
    var containsClass = listItem.classList.contains('edit-mode');

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }

    listItem.classList.toggle('edit-mode');
};

var deleteTask = function () {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
}

var taskCompleted = function () {

    var listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function () {

    var listItem = this.parentNode;
    incompleteTask.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {


    var checkBox = taskListItem.querySelector('.list__item-checkbox');
    var editButton = taskListItem.querySelector('.button_edit');
    var deleteButton = taskListItem.querySelector('.button_delete');

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTask.children.length; i++) {
    bindTaskEvents(incompleteTask.children[i], taskCompleted);
}

for (let i = 0; i < completedTasks.children.length; i++) {
    bindTaskEvents(completedTasks.children[i], taskIncomplete);
}

addButton.addEventListener('click', addTask);