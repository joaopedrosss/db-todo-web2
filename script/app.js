

//seletores
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filtro = document.querySelector(".filtro-todos")

//event listeners
document;addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addTodo)
todoList.addEventListener('click',deleteFeito)
filtro.addEventListener('click',filtrarTodos);

//funcoes

function addTodo(event){
    event.preventDefault();
    //console.log('ola')

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.classList.add('pendente');
    //li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //localstorage
    salvarLocal(todoInput.value);

    //deletar
    const deleteTodo = document.createElement('button');
    deleteTodo.innerHTML = '<i class="fas fa-trash"></i>'
    deleteTodo.classList.add("deletar-btn");
    todoDiv.appendChild(deleteTodo);

    //checar
    const checkTodo = document.createElement('button');
    checkTodo.innerHTML = '<i class="fas fa-check"></i>'
    checkTodo.classList.add("concluir-btn");
    todoDiv.appendChild(checkTodo);
    
    //inserir no thml
    todoList.appendChild(todoDiv);
    todoInput.value='';
}

function deleteFeito(e){
    //console.log(e.target);
    const item = e.target;
    if(item.classList[0] === 'deletar-btn'){
        const todo = item.parentElement;
        removeLocal(todo);
        todo.classList.toggle('deletar');
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }
    if(item.classList[0] === 'concluir-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("feito");
        todo.classList.toggle("pendente");
    }
}

function filtrarTodos(e) {
    var concluido = document.getElementsByClassName('feito');
    var pendente = document.getElementsByClassName('pendente');
    var tudo = document.getElementsByClassName('todo');
    switch (e.target.value) {
        case "tudo":
            for (var i = 0; i < tudo.length; i++){
                tudo[i].style.display = "flex";
            }
            break
        case "concluido":
            for (var i = 0; i < pendente.length; i++){
                pendente[i].style.display = "none";
            }
            for (var i = 0; i < concluido.length; i++){
                concluido[i].style.display = "flex";
            }
            break
        case "pendente":
            for (var i = 0; i < concluido.length; i++){
                concluido[i].style.display = "none";
            }   
            for (var i = 0; i < pendente.length; i++){
                pendente[i].style.display = "flex";
            }  
    }

}

function salvarLocal(todo){
    let tarefas;
    if(localStorage.getItem("tarefas") === null){
        tarefas = [];
    }else{
        tarefas = JSON.parse(localStorage.getItem('tarefas'));//pegar os items
    }
    tarefas.push(todo);
    localStorage.setItem('tarefas',JSON.stringify(tarefas));
}

function getTodos(){
    console.log('hi')
    let tarefas;
    if(localStorage.getItem("tarefas") === null){
        tarefas = [];
    }else{
        tarefas = JSON.parse(localStorage.getItem('tarefas'));//pegar os items
    }
    tarefas.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.classList.add('pendente');
        //li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
       
        //deletar
        const deleteTodo = document.createElement('button');
        deleteTodo.innerHTML = '<i class="fas fa-trash"></i>'
        deleteTodo.classList.add("deletar-btn");
        todoDiv.appendChild(deleteTodo);
    
        //checar
        const checkTodo = document.createElement('button');
        checkTodo.innerHTML = '<i class="fas fa-check"></i>'
        checkTodo.classList.add("concluir-btn");
        todoDiv.appendChild(checkTodo);
        
        //inserir no thml
        todoList.appendChild(todoDiv); 
    });

}

function removeLocal(todo){
    let tarefas;
    if(localStorage.getItem("tarefas") === null){
        tarefas = [];
    }else{
        tarefas = JSON.parse(localStorage.getItem('tarefas'));//pegar os items
    }
    const tarefaIndex = todo.children[0].innerText;
    tarefas.splice(tarefas.indexOf(tarefaIndex),1);
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}