cd Short-url-backend
import axios from "axios";

export const api =  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { accept: "application/json", "content-type": "application/json" },
    // timeout: 2000,
});

VITE_API_URL=http://localhost:8000/api/v1/

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

main.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
export const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
       <App />
       <ToastContainer />
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)

input.jsx


import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Bounce, toast } from "react-toastify";
import { api } from '../api/ApiConnect';
import { queryClient } from '../main';
import AddButton from './AddButton';

function FieldInfo({ field }) {
    return (
      <>
        {field.state.meta.isTouched && !field.state.meta.isValid ? (
          <em className='text-red-500'>{field.state.meta.errors.join(", ")}</em>
        ) : null}
        {field.state.meta.isValidating ? "Validating..." : null}
      </>
    );
  }
const AddTodoInput = ({ onAddTodo, darkMode }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
 const mutation = useMutation({
   mutationFn: (newTodo) =>  api.post("/users/signup", newTodo),
   onSuccess: (res) => {
     // Invalidate and refetch
     queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast(res.data.message || "Todo added successfully!", {
        position: "top-center",
        autoClose: 2000,
        
        theme: "dark",
        transition: Bounce,
      })
   },
   onError: (error) => {
      toast(error.response?.data?.message || "Failed to add todo", {
        position: "top-center",
        autoClose: 2000,
       
        theme: "dark",
        transition: Bounce,
      })
   },
 });


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

   const form = useForm({
     defaultValues: {
       username: "",
       name: "",
       email: "",
       password: "",
     },
     onSubmit: ({ value }) => {
      mutation.mutate(value);
      
      form.reset();
     },
   });


  return (
    <div className="relative">
      <div
        className={`flex w-205 gap-4 p-2 rounded-3xl transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm"
            : "bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm"
        } ${isFocused ? "ring-4 ring-purple-500/30 shadow-2xl" : "shadow-lg"}`}
      >
        {/* From Field */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            //e.stopPropagation();
            form.handleSubmit();
          }}
          className="relative flex flex-col gap-4 my-4"
        >


          <>
            {/* A type-safe field component*/}
            <form.Field
              name="username"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A username is required" : undefined,
              }}
              children={(field) => {
                
                return (
                  <>
                   

                    <input
                      type="text"
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsFocused(true)}
                     
                      placeholder="✨ What needs to be done today ? Title... "
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-lg font-medium placeholder:font-normal ${
                        darkMode
                          ? "border-gray-600 bg-gray-800/60 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80"
                          : "border-gray-200 bg-white/80 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white/90"
                      } focus:outline-none focus:ring-4 focus:ring-purple-500/20 backdrop-blur-sm`}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </>

          <>
            {/* A type-safe field component*/}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A name is required" : undefined,
              }}
              children={(field) => {
                
                return (
                  <>
                    <input
                      type="text"
                      
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsFocused(true)}
                      
                      placeholder="✨ What needs to be done today? Description... "
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-lg font-medium placeholder:font-normal ${
                        darkMode
                          ? "border-gray-600 bg-gray-800/60 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80"
                          : "border-gray-200 bg-white/80 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white/90"
                      } focus:outline-none focus:ring-4 focus:ring-purple-500/20 backdrop-blur-sm`}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </>

          <>
            {/* A type-safe field component*/}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value ? "An email is required" : undefined,
              }}
              children={(field) => {
                
                return (
                  <>
                    <input
                      type="email"
                      
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsFocused(true)}
                      
                      placeholder="✨ What needs to be done today? Description... "
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-lg font-medium placeholder:font-normal ${
                        darkMode
                          ? "border-gray-600 bg-gray-800/60 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80"
                          : "border-gray-200 bg-white/80 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white/90"
                      } focus:outline-none focus:ring-4 focus:ring-purple-500/20 backdrop-blur-sm`}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </>

          <>
            {/* A type-safe field component*/}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A password is required" : undefined,
              }}
              children={(field) => {
                
                return (
                  <>
                    <input
                      type="password"
                      
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsFocused(true)}
                      
                      placeholder="✨ What needs to be done today? Description... "
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-lg font-medium placeholder:font-normal ${
                        darkMode
                          ? "border-gray-600 bg-gray-800/60 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/80"
                          : "border-gray-200 bg-white/80 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white/90"
                      } focus:outline-none focus:ring-4 focus:ring-purple-500/20 backdrop-blur-sm`}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </>

        

          {isFocused && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none animate-pulse" />
          )}

          <AddButton />
        </form>
        {/* From Field */}
      </div>
    </div>
  );
};

export default AddTodoInput;






