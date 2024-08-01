import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";

import NoteHistoryPage from "../NoteHistoryPage/NoteHistoryPage";
import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      
      {user ? (
        <>
        <NavBar user={user}/>
          <Routes>
            {/* <Route path="/notes/new" element={<NewNotePage />} /> */}
            <Route path="/notes" element={<NoteHistoryPage user={user}/>} />
          </Routes>
        </>
      ) : (
        <AuthPage user={user} setUser={setUser}/>
      )}
    </main>
  );
}
