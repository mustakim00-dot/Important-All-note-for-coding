import axios from "axios";


export const api =  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { accept: "application/json", "content-type": "application/json" },
    // timeout: 2000,
});
npm i axios
npm i react-toastify
npm i @tanstack/react-query
npm i @tanstack/react-form
npm i zustand
npm i tailwind-merge

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || WHITELIST.includes(origin)) {
        callback(null, origin);
        //callback()
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // যদি cookie / auth দরকার হয়
  })
);

PORT = 8000
const WHITELIST = process.env.WHITELIST || ["http://localhost:9000/"];
WHITELIST=["http://localhost:9000/","http://localhost:5173/"];
