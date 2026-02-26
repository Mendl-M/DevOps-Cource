// Task Manager Business Logic
class TaskManager {
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
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        taskInput.value = '';
        taskInput.focus();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
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

        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div style="flex: 1;">
                    <strong>${this.escapeHtml(task.text)}</strong>
                    <br/>
                    <small style="opacity: 0.7;">${task.createdAt}</small>
                </div>
                <div>
                    <button onclick="taskManager.toggleTask(${task.id})" style="background-color: #005500;">
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onclick="taskManager.deleteTask(${task.id})" class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    updateStats() {
        const totalCount = document.getElementById('totalCount');
        const completedCount = document.getElementById('completedCount');
        const pendingCount = document.getElementById('pendingCount');

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
