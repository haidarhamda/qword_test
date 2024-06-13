"use client"
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter} from 'next/navigation';

export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const cookies = useCookies();
    const router = useRouter();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(email);
        // console.log(password);
        fetch('http://127.0.0.1:3001/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ email, password }),
          })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }

              else{
                alert('Email atau password salah');
                console.log(res);
                return res.json();
              }
          })
          .then((data) => {
            if (data.message === 'Login success'){
              alert('Login sukses, cari domain kembali');
              cookies.set('email', data.user.email);
              cookies.set('name', data.user.name);
              router.push('/');
              // console.log(cookies.get('email'));
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
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Register
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
        );
    
}