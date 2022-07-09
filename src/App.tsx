
import { Header } from './components/Header'

import { PlusCircle, ClipboardText} from 'phosphor-react'

import styles from './App.module.css'

import './global.css'
import { Task } from './components/Task'
import { ChangeEvent, FormEvent, useState } from 'react'


interface Task {
  checked: boolean
  task: string
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')


  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, {checked: false, task: newTaskText}])
    setNewTaskText('')
    console.log(tasks)

  }

  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  function countChecked(content: string, checked: boolean) {
    const taskIndex = tasks.findIndex(task => task.task === content)
    
    const tempTasks = [...tasks];
    tempTasks[taskIndex].checked = checked;
    
    setTasks(tempTasks)
  }

  function deleteTask(taskToDelete: object) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task !== taskToDelete;
    })
    setTasks(tasksWithoutDeletedOne)
  }

  const isCompleted = tasks.filter(task => task.checked === true);

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateTask} className={styles.taskForm}>
          
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            value={newTaskText}
            onChange={handleNewCommentChange}
            required
           />

          <button type='submit'>Criar <PlusCircle size={16}/></button>
        </form>
        <div className={styles.taskDetail}>
          <div className={styles.taskCreate}>
            <strong>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>

          <div className={styles.taskComplete}>
            <strong>Concluídas</strong>
            <span>{isCompleted.length} de {tasks.length}</span>
          </div>

        </div>
      
          <main>
            <div className={styles.taskList}>
              
              {
                tasks.length === 0 ? (
                  <div className={styles.taskListEmpty}>
                    <ClipboardText size={56} />
                    <div>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                  </div>
                  ): (
                    tasks.map(task => {
                      return  (
                       <Task 
                         key={task.task} 
                         content={task}
                         onCountChecked={countChecked}
                         onDeleteTask={deleteTask}
                       />
                      )
                     })
                  )
                }
                </div>
          </main>

      </div>
    </div>
  )
}
