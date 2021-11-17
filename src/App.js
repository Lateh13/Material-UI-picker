import React, { useState }  from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {
  const [todo, setTodo] = useState({desc: '',date: new Date()});
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('home');

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

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value="home" label="HOME" />
        <Tab value="mytodos" label="MY TODOS" />
      </Tabs>
      {value === 'home' && <div>Welcome to my todolist page</div>}
      {value === 'mytodos' && <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker 
            name="date" 
            label="Date"
            variant="standard"  
            value={todo.date} 
            onChange={date => dateChanged(date)}
          />
        </MuiPickersUtilsProvider>
        <TextField 
          size="small"
          name="desc" 
          label="Description" 
          variant="standard" 
          onChange={inputChanged} value={todo.desc}
        />
        <Button size="large" variant="contained" onClick={addTodo}>Add</Button>
        <table>
          <tbody>
            {todos.length>0 &&<tr>
              <th>Date</th>
              <th>Description</th>
            </tr>}
          {
          todos.map((todo, index) => 
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.desc}</td>
            </tr>)
          }
          </tbody>
        </table>
      </div>}
    </div>
  );
}

export default App;
