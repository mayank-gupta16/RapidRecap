import './App.css';
import { Route, Routes } from 'react-router-dom';
import Card from "./components/Card";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Timeline from './components/Timeline';
const App = () => {

  return (
    <>
    <Routes>
        <Route path='/' element={<Timeline/>} />
      </Routes>
    </>
  )
}

export default App;
