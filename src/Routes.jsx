import{BrowserRouter,Routes,Route} from "react-router-dom"
import EditNotes from "./EditNotes";
import App from "./App";

function RoutesComponents() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/notes/:id" element={<EditNotes/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponents