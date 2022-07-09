
import { Trash } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './Task.module.css'

interface TaskProps {
  content: {
    checked: boolean;
    task: string;
  }
  onCountChecked: (countChecked: string, checked: boolean) => void;
  onDeleteTask: (taskToDelete: object) => void;
}

export function Task({  content, onCountChecked, onDeleteTask }: TaskProps) {
  const [checked, setChecked ] = useState(false)

  function handleChangeChecked() {
    setChecked(prevState => !prevState)
    onCountChecked(content.task, !checked)
  }

  function handleDeleteTask() {
    onDeleteTask(content)
  }

  return (
    <div className={styles.wrapper}>
      <div className={checked ? styles.wrapperChecked : styles.wrapperContainer}>
        <div className={styles.content}>
            <input 
              type="checkbox" 
              name="checkbox" 
              checked={checked} 
              onChange={handleChangeChecked}
            />
          <p>{content.task}</p>
        </div>
        <button onClick={handleDeleteTask} title='Deletar Tarefa'>
          <Trash />
        </button>
      </div>
    </div>
  )
}