$(document).ready(function(){
    var todo = $(".js-wrapper-todo");

    // Add todo
    $('.js-add-list').on("click", function () {
        todo.append(addToDo());
    });

    //Delete todo list
    todo.on("click", ".js-del-todo-list", function () {
        $(this).parents(".js-todo").remove();
    });

    //Edit todo list title
    todo.on("click", ".js-edit-todo-header-title", function () {
        $(this).parent().siblings(".js-todo-header-title").prop("contenteditable", true).focus();
    });

    //Show todo input
    todo.on("click", ".js-show-input", function () {
        $(this).parent().siblings(".js-input-item").show();
    });

    // Add todo item on keypress enter
    todo.on("keypress", "input", function () {
        if (event.which == 13) {
            var inputTxt = $(this).val();

            if (inputTxt) {
                $(this).parents(".js-todo-search").siblings(".js-todo-list").append(addToDoItem(inputTxt));
                $(this).val("");
            }
        };
    });

    // Add todo item on click button
    todo.on("click", ".js-btn-submit", function () {
        var inputTxt = $(this).siblings("input").val();

        if (inputTxt) {
            $(this).parents(".js-todo-search").siblings(".js-todo-list").append(addToDoItem(inputTxt));
            $(this).val("");
        }
    });

    // Completed todo item
    todo.on("click", ".js-checkbox", function () {
        $(this).parent().siblings(".js-todo-item-title").toggleClass("done");
    });

    // Deadline todo item
    todo.on("click", ".js-show-datapicker", function () {
        var itemTitle = $(this).parent().siblings(".js-todo-item-title"),
            date = itemTitle.find("input").val();

        if (date == '') {
            itemTitle.find("input").toggle();
        } else {
            itemTitle.find("input").show();
        }
    });

    // Set deadlines states dates
    todo.on("mouseleave", ".js-datepicker", function () {
        var dNow = new Date(),
            date = $(this).val(),
            utcdate = dNow.getFullYear()+'-'+(dNow.getMonth()+ 1)+'-'+dNow.getDate(),
            span = $(this).siblings("span");

        if (date !='') {
            if (date == utcdate) {
                $(this).css('color', '#ef6926');
                console.log(date);
            } else if(date > utcdate) {
                $(this).css('color', '#7bc15b');
            } else if (date < utcdate) {
                $(this).css('color', '#e02222');
            }
        } else {
            $(this).css('color', 'inherit');
        }
    });

    // Edit todo item
    todo.on("click", ".js-edit-todo-item", function () {
        var itemTitle = $(this).parent().siblings(".js-todo-item-title"),
            span = itemTitle.find("span"),
            value = span.attr('contenteditable');

        if (value == 'false') {
            span.attr('contenteditable','true').focus();
        } else {
            span.attr('contenteditable','false');
        }
    });

    // Delete todo item
    todo.on("click", ".js-del-todo-item", function () {
        $(this).parents(".js-has-todo-item").remove();
    });

    // Sortable todo items
    todo.on("mouseenter", ".js-todo-list", function () {
        $(this).sortable();
    });

    //Todo item
    function addToDoItem(inputTxt) {
        var html = '<div class="has-todo-item d-flex has-hidden hoverable js-has-todo-item">' +
                        '<div class="todo-item todo-item-check"><input class="js-checkbox" type="checkbox" name=""></div>' +
                        '<div class="todo-item todo-item-title d-flex grow-1 wbr js-todo-item-title"><span contenteditable="false">' + inputTxt + '</span><div><input type="date" value="" class="hoverable js-datepicker"></div></div>' +
                        '<div class="todo-item todo-controls d-flex hidden">' +
                            '<i class="fa fa-sort js-drag-todo-item"></i>' +
                            '<i class="fa fa-calendar-alt js-show-datapicker"></i>' +
                            '<i class="fa fa-pen js-edit-todo-item"></i>' +
                            '<i class="fa fa-trash-alt js-del-todo-item"></i>' +
                        '</div>' +
                    '</div>';

        return html;
    }

    // Todo list
    function addToDo() {
        var list = '<div class="todo js-todo">'+
                        '<div class="todo-header has-todo-item d-flex hoverable has-hidden">'+
                            '<div class="todo-item">'+
                                '<i class="fa fa-tasks"></i>'+
                            '</div>'+
                            '<div class="todo-header-title todo-item wbr grow-1 js-todo-header-title">Todo List</div>'+
                            '<div class="todo-item todo-controls hidden">'+
                                '<i class="fa fa-pen js-edit-todo-header-title"></i>'+
                                '<i class="fa fa-trash-alt js-del-todo-list"></i>'+
                            '</div>'+
                        '</div>'+
                        '<div class="todo-search has-todo-item d-flex js-todo-search">'+
                            '<div class="todo-item todo-search-item hoverable">'+
                                '<i class="fa fa-plus js-show-input"></i>'+
                            '</div>'+
                           '<div class="todo-item d-flex grow-1 js-input-item" style="display: none;">'+
                                '<input type="text" placeholder="Start typing here to create a task">'+
                                '<button class="js-btn-submit hoverable" type="submit">Add Task</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="todo-list js-todo-list"></div>'
                    '</div>';

        return list;
    }
});
