import { getTodos } from './todos'
import { getFilters } from './filters'
import { toggleTodo, removeTodo } from './todos'

// Render todos based on filters
const renderTodos = () => {
    const todoEl = document.getElementById('todo-list');
    const { searchText, hideCompleted } = getFilters();

    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase());
        const hideCompletedMatch = !hideCompleted || !todo.complete;
        
        return searchTextMatch && hideCompletedMatch;
    });

    const incompleteTodos = filteredTodos.filter((todo) => !todo.complete);

    todoEl.innerHTML = '';
    todoEl.appendChild(generateSummaryDOM(incompleteTodos));
    
    if(filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo));
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = 'No to-dos to show';
        todoEl.appendChild(emptyMessage);
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    // Create div for Note
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');

    // create input with type checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    containerEl.appendChild(checkbox);
    checkbox.checked = todo.complete;

    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
        renderTodos();
    });

    // Create span tag
    const p = document.createElement('span');
    p.textContent = todo.text;
    containerEl.appendChild(p);
    
    //setup container
    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    // create delete button
    const removeButton = document.createElement('button');
    removeButton.classList.add('button', 'button--text')
    removeButton.textContent = 'remove';
    todoEl.appendChild(removeButton);
    
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id);
        renderTodos();
    });

    return todoEl;
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2');
    summary.classList.add('list-title');

    if(incompleteTodos.length === 1) {
        summary.textContent = `You have ${incompleteTodos.length} todo left`;
    } else {
        summary.textContent = `You have ${incompleteTodos.length} todos left`;
    }

    return summary;
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }