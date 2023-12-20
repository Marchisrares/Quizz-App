// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from './components/Quiz';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <div>
        < Navbar/>
        <Quiz />
      </div>
    </div>
  );
}

export default App;
