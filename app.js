var Fire = new Vue()

Vue.component('todo', {
	template: `
        <div class="d-flex justify-content-between my-2 bg-white p-2">
            <span>{{ todo.task }}</span>
            <div>
                <button class="btn btn-sm btn-success" @click="changeDone">{{ todo.done ? "Uncheck" : "Check" }}</button>
                <button class="btn btn-sm btn-danger" @click="deleteTodo">&times</button>
            </div>
        </div>
    `,
	props: {
		todo: Object
	},
	methods: {
		changeDone() {
			Fire.$emit('changeDone', this.todo)
		},
		deleteTodo() {
			Fire.$emit('deleteTodo', this.todo)
		}
	}
})

new Vue({
	el: '#app',
	data: {
		todos: [
			{ task: 'Wake up', done: false },
			{ task: 'Eat breakfast', done: true },
			{ task: 'Go to work', done: false }
		],
		newTask: ''
	},
	template: `
        <div class="container p-3">
            <h1>To do:</h1>
            <todo v-for="todo in unDoneTodos" :key="todo.task" :todo=todo />

            <div class="d-flex justify-content-between mt-5">
                <span>Task:</span>
                <input v-model="newTask" class="form-control ml-3">
            </div>
            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-primary" @click="saveTodo">Save item</button>
            </div>

            <h4>Done tasks</h4>
            <todo v-for="todo in doneTodos" :key="todo.task" :todo=todo />
        </div>
    `,
	mounted() {
		Fire.$on('changeDone', todoToUpdate => {
			var todo = this.todos.find(todo => todo == todoToUpdate)
			todo.done = !todo.done
		})
		Fire.$on('deleteTodo', todoToDelete => {
			this.todos = this.todos.filter(todo => todo != todoToDelete)
		})
	},
	computed: {
		doneTodos() {
			return this.todos.filter(todo => todo.done == true)
		},
		unDoneTodos() {
			return this.todos.filter(todo => todo.done == false)
		}
	},
	methods: {
		saveTodo() {
			this.todos.push({ task: this.newTask, done: false })
			this.newTask = ''
		}
	}
})
