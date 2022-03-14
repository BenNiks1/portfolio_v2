import axios from "axios";

export const getDesktopData = () => axios.get("./db.json");
