import React from 'react'
import './App.css';
import AppRouter from './Router';

function App() {
    const user = sessionStorage.getItem('user')

  return (
    <div className="App">
        <AppRouter user={user}/>
    </div>
  );
}

export default App;
