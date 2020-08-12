import { renderTodos } from './views';
import { setFilters } from './filters';
import { loadTodos, createTodo } from './todos';

renderTodos();

document.getElementById('search-todo').addEventListener('input', (e) =>{
    setFilters({
        searchText: e.target.value
    })
    renderTodos();
});

// Add new todo by form
document.getElementById('new-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = e.target.elements.addTodo.value.trim();

    if(text.length > 0) {
        createTodo(text)
        renderTodos();
        // Clear field after submitting new todo
        e.target.elements.addTodo.value = '';
    }
});

// Check box that can hide/unhide completed todos
document.getElementById('hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos();
});

window.addEventListener('storage', (e) => {
    if(e.key === 'todos') {
        loadTodos();
        renderTodos();
    }
})
// Bonus: Add a watcher for local storage