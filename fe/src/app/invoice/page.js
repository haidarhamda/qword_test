"use client"
import { useState,useEffect } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter, useSearchParams } from 'next/navigation';

export default function Invoice() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [payments, setPayments] = useState([]);
    const searchParams = useSearchParams();
    const domain = searchParams.get('domain');
    const price = searchParams.get('price');
    const cookies = useCookies();
    const router = useRouter();
    const bankAccount = '1234567890';
    useEffect(() =>{
        setEmail(cookies.get('email'));
        setName(cookies.get('name'));
        if(email === null || email === undefined ){
            alert('Silahkan login terlebih dahulu');
            router.push('/login');
        }
    })

    useEffect(() => {
        fetch('http://127.0.0.1:3001/payments/'+'2@mail.com')
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            else{
                throw new Error('Error fetching data');
            }
        }
        )
        .then((data) => {
            setPayments(data);
            console.log(data);
        }
        )
        .catch((error) => {
            console.error(error);
        });
    });

    
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Invoice</h2>
            <div className="mb-6">
                <div className="flex justify-between">
                <div>
                    <p className="text-sm text-gray-600">No Invoice : #{payments.length+1}</p>
                    <p className="mt-1 text-sm text-gray-600">{name}</p>
                    <p className="mt-1 text-sm text-gray-600">{email}</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">UNPAID</p>
                </div>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left text-sm text-gray-600">No</th>
                <th className="py-2 px-4 text-left text-sm text-gray-600">Deskripsi</th>
                <th className="py-2 px-4 text-left text-sm text-gray-600">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr key={1} className="border-b border-gray-200">
                    <td className="py-2 px-4 text-sm text-gray-700">1</td>
                    <td className="py-2 px-4 text-sm text-gray-700">Pembelian domain {domain}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">Rp {price}</td>
                </tr>
            </tbody>
            </table>
            <div className="mt-4 flex justify-end">
                <p className="text-lg font-semibold text-gray-800">Total : {price}</p>
            </div>
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Silahkan bayar di no rekening berikut ini :</p>
                <p className="mt-1 text-lg font-semibold text-gray-800">{bankAccount}</p>
            </div>
          </div>
        </div>
        );
    }