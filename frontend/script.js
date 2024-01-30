async function populateList(){
    try {
        const todoJson = await fetch ("http://localhost:3000/todos")
        var obJson = await todoJson.json()
    } catch (error) {
        console.error(error.message)
    }
    const list =  document.getElementById("list")
    list.innerHTML = ""
    obJson.forEach(todo => {
        let todoDiv = document.createElement("div")
        todoDiv.classList.add("todo-div")

        const todoTitle = document.createElement("h3")
        todoTitle.classList.add("todo-title")
        todoTitle.textContent = todo.title
        todoDiv.appendChild(todoTitle)

        const todoDesc = document.createElement("p")
        todoDesc.classList.add("todo-desc")
        todoDesc.textContent = todo.description
        todoDiv.appendChild(todoDesc)

        const todoCompleted = document.createElement("div")
        if(todo.completed){
            todoCompleted.classList.add("todo-completed")
            todoCompleted.textContent = "Done!"
            todoDiv.appendChild(todoCompleted)
        }else{
            todoCompleted.classList.add("todo-completed")
            todoCompleted.textContent = "Mark as complete"
            todoDiv.appendChild(todoCompleted)
        }
        todoCompleted.addEventListener('click',()=>{
            markAsComplete(todo._id)
        })
        todoDiv.appendChild(todoCompleted)
        list.appendChild(todoDiv)
    });
}

async function createTodo(){
    let newTodo = {}
    let title = document.getElementById("title").value
    let desc = document.getElementById("description").value
    newTodo = {
        title: title,
        description: desc
    }

    newTodo = JSON.stringify(newTodo)

    console.log(newTodo)

    try {
        const response = await fetch ("http://localhost:3000/todo",{
            method: 'POST',
            body: JSON.stringify(newTodo)
        })
        if(!response.ok){
            throw new Error
        }

        populateList()
        
        document.getElementById("title").value = ''
        document.getElementById("description").value = ''
    } catch (error) {
        console.error(error.message)
    }
}

async function markAsComplete(id){
    try {
        const varButton = document.getElementById(id)
        let response = await fetch(`http://localhost:3000/edit:${id}`, {
            method: 'PUT'
        })
        if(!response.ok){
            alert("Failed to mark todo as complete")
        }
        populateList()
    } catch (error) {
        console.error(error.message)
    }
}

populateList()