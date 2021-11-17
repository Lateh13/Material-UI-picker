import React, { useState }  from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const [todo, setTodo] = useState({desc: '',date: new Date()});
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const dateChanged = (date) => {
    const [year, month, day] = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    let dateString = year+'/'+month+'/'+day;
    setTodo({...todo, date: dateString});
  }

  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker size="small" name="date" label="Date" value={todo.date} onChange={date => dateChanged(date)}/>
      </MuiPickersUtilsProvider>
      <TextField size="small" name="desc" label="Description" variant="standard" onChange={inputChanged} value={todo.desc}/>
      <Button size="large" variant="contained" onClick={addTodo}>Add</Button>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Description</th>
          </tr>
        {
        todos.map((todo, index) => 
          <tr key={index}>
            <td>{todo.date}</td>
            <td>{todo.desc}</td>
          </tr>)
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;
