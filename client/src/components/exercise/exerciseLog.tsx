import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface ExercieseProps {
  deleteExercise(_id: any): void;
  exercise: any;
}

const Exercise = (props: ExercieseProps) => (
  <tr>
    <td>{props.exercise.workout}</td>
    <td>{props.exercise.sets}</td>
    <td>{props.exercise.reps}</td>
    <td>{props.exercise.weight}</td>

    <td>
      <Link to={`/edit/${props.exercise._id}`}>Edit</Link>
      <button onClick={() => props.deleteExercise(props.exercise._id)}>
        Delete
      </button>
    </td>
  </tr>
)

export default function ExerciseLog() {
  const [exercises, setExercises] = useState([])
  console.log({ exercises })

  // This method fetches the records from the database
  useEffect(() => {
    async function getExercises() {
      const response = await fetch(`http://localhost:3000/exercise`)

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const exercises = await response.json()
      setExercises(exercises)
    }
    getExercises()

    return
  }, [exercises.length])

  // This method will delete a record
  async function deleteExercise(id) {
    await fetch(`http://localhost:3000/exercise/${id}`, {
      method: "DELETE",
    })
    const newExercises = exercises.filter((el: any) => el._id !== id)
    setExercises(newExercises)
    console.log({ exercises })
  }

  // This method will map out the records on the table
  function exerciseList() {
    return exercises.map((exercise: any) => {
      return (
        <Exercise
          exercise={exercise}
          deleteExercise={() => deleteExercise(exercise._id)}
          key={exercise._id}
        />
      )
    })
  }

  function welcomePage() {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>
          You don't appear to have any previous workouts recorded. Try adding a
          new workout using the "Add Workout" button at the bottom of the screen
        </p>
        <Link to="/create">
          <button>ADD WORKOUT</button>
        </Link>
        <button>
          <Link to={`/pastworkouts`}>Past Workouts</Link>
        </button>
      </div>
    )
  }
  console.log(exerciseList().length)
  // This following section will display the table with the records of individuals.
  return (
    <div>
      {exerciseList().length === 0 ? welcomePage() : <h3>Exercise List</h3>}
      <table style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Workout</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  )
}
