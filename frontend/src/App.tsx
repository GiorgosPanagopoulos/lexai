import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CourtroomPage from "./pages/CourtroomPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courtroom/:caseId" element={<CourtroomPage />} />
      </Routes>
    </BrowserRouter>
  );
}
