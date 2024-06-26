"use client"
import { useState } from "react";
import { useRouter} from 'next/navigation';

export default function Register(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const router = useRouter();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      }
    const handleNameChange = (event) => {
        setName(event.target.value);
      }
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:3001/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ email, password, name }),
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json();
        })
        .then((data) => {
          if (data.message === 'User created'){
            alert('User ditambahkan, silahkan login');
            router.push('/login');
          }
          else if (data.message === 'User already exists'){
            alert('Email sudah digunakan');
          }
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
  }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={handleEmailChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={handleNameChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="username"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login
                  </a>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
    )
}