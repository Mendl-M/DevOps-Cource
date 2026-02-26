// Task Manager Business Logic
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.init();
    }

        }

        this.renderTasks();
        this.updateStats();
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,ks();
        this.updateStats();
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        if (!taskList) return;

        taskList.innerHTML = '';

        if (this.tasks.length === 0) {
            taskList.innerHTML = '<li style="text-align: center; opacity: 0.6;">No tasks yet. Add one to get started!</li>';
            return;
        }
ment.getElementById('pendingCount');

        const completed = this.tasks.filter(task => task.completed).length;
        const pending = this.tasks.length - completed;

        if (totalCount) totalCount.textContent = this.tasks.length;
        if (completedCount) completedCount.textContent = completed;
        if (pendingCount) pendingCount.textContent = pending;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    clearAllTasks() {
        if (confirm('Are you sure you want to clear all tasks?')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
    console.log('Task Manager initialized');
});
