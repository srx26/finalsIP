import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from "./components/task-activity/Add";
import List from "./components/task-activity/List";
import Main from './components/task-activity/Main';

const App = () => {
  return (
    <Router>
      <div> 
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/" element={<Main />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
