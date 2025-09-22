import{BrowserRouter,Routes,Route} from "react-router-dom"
import EditNotes from "./Notes/EditNotes";
import App from "./App";
import Users from "./Users/Users";
import Login from "./Users/Login";
import Note from "./Notes/Note";

function RoutesComponents() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/login" element={<Login/>}/>
         <Route path="/note" element={<Note/>}/>
         <Route path="/notes/:id" element={<EditNotes/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponents