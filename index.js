// aqui va todo el código
console.log("hola mundo")

const deleteTask = (id) => {
    
    console.log("eliminando....", id)
    // buscamos etiqueta ol
    const taskListElement = document.getElementById("task-list")
    // buscamos etiqueta li por el id
    const elementToDelete = document.getElementById(id)

    // eliminamos etiqueta li
    taskListElement.removeChild(elementToDelete)

    var listLi = document.querySelectorAll("#task-list li");
    //modificamos el total de tareas
    document.getElementById("total-tareas").innerHTML = `Listado de tareas: ${listLi.length}`
    if(listLi.length == 0){
        document.getElementById("total-tareas").innerHTML = "Listado de tareas"
        //ocultamos el boton de borrar todo
        document.getElementById("delete-all-btn").style.visibility = "hidden";
    }
}

const btnElement = document.getElementById("delete-all-btn")

if (btnElement) {
    btnElement.addEventListener("click", function() {
        console.log("eliminando todas las tareas....")
        let alerta = confirm("Seguro que deseas eliminar todas las tareas?");
        console.log(alerta);
        if(alerta){
            var deleteAudio = new Audio("delete.mp3");
            deleteAudio.play();
            document.getElementById("task-list").innerHTML = "";
            //ocultamos el boton de borrar todo
            document.getElementById("delete-all-btn").style.visibility = "hidden";
            //modificamos el total de tareas
            document.getElementById("total-tareas").innerHTML = "Listado de tareas"
        }       
    })
}

// agarrar el elemento form
const formElement = document.getElementById("task-form")

if (formElement) {
    console.log("formulario funcionando...")
    // modificar el evento
    formElement.addEventListener("submit", function(event) {
        event.preventDefault()
       
        // extraer los datos nombre de la tarea y prioridad
        const inputElement = document.getElementById("taskName")

        const inputElementDate = document.getElementById("taskDate")
        
        if (inputElement.value !== "") {
            // buscar el select
            const selectElement = document.getElementById("taskPriority")
            
            // tengo los valoes del input y del select
            console.log(inputElement.value)
            console.log(selectElement.value)
            console.log(inputElementDate.value)

            // agregar nuevo li a la lista
            const taskListElement = document.getElementById("task-list")

            let mayorId = 1 

            // verificamos cantida de hijos de una etiqueta
            if (taskListElement.children.length > 0) {
                // buscamos el hijo
                const ultimoHijo = taskListElement.children[ taskListElement.children.length - 1 ]
                // incrementar
                mayorId += parseInt( ultimoHijo.id ) 
            }
            
            let bgColor = "";
            let fontColor = "white";

            if(selectElement.value == 1 || selectElement.value == 2){
                bgColor = "bg-primary";
            }else if (selectElement.value == 3 || selectElement.value == 4){
                bgColor = "bg-warning";
                fontColor = "black";
            }else{
                bgColor = "bg-danger";
            }

            taskListElement.innerHTML += `
            <li id="${mayorId}" class="list-group-item d-flex justify-content-between align-items-center ${bgColor}"
                style="word-break: keep-all; color: ${fontColor};">
                <div class="mx-2 text-start" style="flex: 1;">
                    <div class="fw-bold">${inputElement.value}</div>
                    <div class="fw-light">${inputElementDate.value}</div>

                </div>
                <span class="badge bg-primary rounded-pill mx-1">${selectElement.value}</span>
                <button onclick="deleteTask(${mayorId})" type="button" class="btn btn-outline-danger btn-sm">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px"
                        height="20px">
                        <path
                            d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                    </svg>
                </button>
            </li>
            `
            // Limpiamos los inputs
            inputElement.value = "";
            selectElement.value = "5";
            inputElementDate.value = "";

            //ponemos el boton de borrar todo visible
            document.getElementById("delete-all-btn").style.visibility = "visible";

            //modificamos el total de tareas
            var listLi = document.querySelectorAll("#task-list li");
            document.getElementById("total-tareas").innerHTML = `Listado de tareas: ${listLi.length}`


        } else {
            alert(" Debes especificar una tarea")
        }

    })
}