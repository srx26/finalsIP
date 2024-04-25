import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from "./components/task-activity/Add";
import List from "./components/task-activity/List";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from './components/task-activity/Main';

const App = () => {
  return (
    <Router>
      <div> 
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
