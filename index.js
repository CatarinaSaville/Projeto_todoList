
if (!existsListOnLocalStorage()) saveListOnLocalStorage([]);
else insertTodoListIntoHtml();

function saveListOnLocalStorage(listTodo) {
    localStorage.setItem('listTodo', JSON.stringify(listTodo));
}

function getListTodoFromStorage() {
    var list = localStorage.getItem('listTodo');
    return JSON.parse(list);
}

function existsListOnLocalStorage() {
    return !!localStorage.getItem('listTodo');
}

function insertTodoListIntoHtml() {
    var list = getListTodoFromStorage();
    list.forEach(element => {
        adicionarNoHtml(element.item, element.status);
    });
}

function adicionar() {
    var item = getNewItemFromHtml();
    saveItemOnLocalStorage(item, 'unchecked');
    adicionarNoHtml(item);
}

function getNewItemFromHtml(){
   return document.querySelector("#item").value;
}

function adicionarNoHtml(item, status) {

    var novoItem = document.createElement("input");
    novoItem.type = "checkbox";
    if (status == 'checked') novoItem.checked = true;
    novoItem.onclick = function () {
        toggleHtml(this);
        toggleOnLocalStorage(this, item);
    };

    var btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.className = "btn"
    btnExcluir.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i> ";
    btnExcluir.onclick = function () {
        excluir(this);
    };

    var novoItemLista = document.createElement("li");
    if (status == 'checked') novoItemLista.classList.add('done');
    novoItemLista.append(novoItem);
    novoItemLista.append(item);
    document.querySelector("#item").value = "";
    novoItemLista.append(btnExcluir);

    document.querySelector("#lista").append(novoItemLista);
}


function updateItemOnLocalStorage(itemTxt, status) {
    var list = getListTodoFromStorage();
    list.forEach(element => {
        if (element.item == itemTxt) element.status = status;
    });
    saveListOnLocalStorage(list);
}


function saveItemOnLocalStorage(itemTxt, status) {
    var list = getListTodoFromStorage();
    list.push({ item: itemTxt, status: status });
    saveListOnLocalStorage(list);
}

function toggleHtml(item) {
    item.parentElement.classList.toggle("done");
}

function toggleOnLocalStorage(item, itemTxt) {
    if (item.checked) {
        updateItemOnLocalStorage(itemTxt, 'checked');
    } else {
        updateItemOnLocalStorage(itemTxt, 'unchecked');
    }
}

function excluir(item) {
    item.parentElement.remove();
}
