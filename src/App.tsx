import { Route, Routes } from "react-router-dom";
import { Desktop, StartMenu } from "./pages";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/start" element={<StartMenu />} />
    </Routes>
  );
};
