var todoList = $(".js-todo-list");

//Delete todo list
$(".js-del-todo-list").on("click", function () {
    $(".todo").remove();
});

//Edit todo list title
$(".js-edit-todo-header-title").on("click", function () {
    $(".todo-header-title").prop("contenteditable", true).focus();
});

//Show todo input
$(".js-show-input").on("click", function () {
    $(".js-input-item").show();
});

// Completed To-Do
todoList.on("click", ".js-checkbox", function () {
    $(this).parent().siblings(".todo-item-title").toggleClass("done");
});

// Delete todo-item
todoList.on("click", ".js-del-todo-item", function () {
    $(this).parent().parent().remove();
});

// Edit todo-item
todoList.on("click", ".js-edit-todo-item", function () {
    $(this).parent().siblings(".todo-item-title").prop("contenteditable", true).focus();
});

//Add todo-item callback function
var callback = function() {
    var inputTxt = $("input").val();

    if (inputTxt) {
        $(".js-todo-list").append(addToDoItem(inputTxt));
        $(this).val("");
    } else {
        $(".js-todo-list").text('Enter your task');
    }
};

//Add todo-item on keypress enter
$("input").keypress(function() {
    if (event.which == 13) callback();
});

//Add todo-item on btn submit click
$('.js-btn-submit').click(callback);

// Sortable todo-items
todoList.sortable();

//Todo item
function addToDoItem(inputTxt) {
    var html = '<div class="has-todo-item d-flex has-hidden hoverable">' +
                    '<div class="todo-item todo-item-check"><input class="js-checkbox" type="checkbox" name=""></div>' +
                    '<div class="todo-item todo-item-title grow-1 wbr">' + inputTxt + '</div>' +
                    '<div class="todo-item todo-controls d-flex hidden">' +
                        '<i class="fa fa-sort js-drag-todo-item"></i>' +
                        '<i class="fa fa-pen js-edit-todo-item"></i>' +
                        '<i class="fa fa-trash-alt js-del-todo-item"></i>' +
                    '</div>' +
                '</div>';

    return html;
}