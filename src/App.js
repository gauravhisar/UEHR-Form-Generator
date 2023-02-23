import './App.css';
import Main from "./components/Main"
import Submission from "./components/Submission"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import FileUploadPage from './components/FileUploadPage';
import {useState} from 'react';


function App() {
  const [archetype, setArchetype] = useState([]);
  const [archetypeLoaded, setArchetypeLoaded] = useState(false);
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<FileUploadPage key = "FileUploadPage"  archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
        <Route exact path="/archetype" element={<Main key = "Archetype" archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
        <Route exact path="/submission" element={<Submission key = "Submission" archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
