"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";
import { useCookies } from 'next-client-cookies';
import Select from 'react-select';

export default function Order() {
    const searchParams = useSearchParams();
    const domain = searchParams.get('domain');
    const router = useRouter();
    const [price, setPrice] = useState(0);
    const cookies = useCookies();

    const options = [
        { label: '1 bulan', value: '1 bulan' },
        { label: '3 bulan', value: '3 bulan' },
        { label: '6 bulan', value: '6 bulan' },
        { label: '1 tahun', value: '1 tahun' },
      ];
    const [selectedOption, setSelectedOption] = useState({ label: '1 bulan', value: '1 bulan' });
    useEffect(() => {
        if (selectedOption.value === '1 bulan') {
            setPrice(20000);
        } else if (selectedOption.value === '3 bulan') {
            setPrice(40000);
        } else if (selectedOption.value === '6 bulan') {
            setPrice(60000);
        } else if (selectedOption.value === '1 tahun') {
            setPrice(100000);
        }
    }, [selectedOption]);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        console.log(event.target);
        setSelectedOption(selectedValue);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedOption);
        console.log(price);
        router.push('/invoice?domain=' + domain + '&price=' + price );
    }
    // console.log(domain);
    // console.log(price);
    useEffect(() =>{
        const email = cookies.get('email');
        if(email === null || email === undefined){
            alert('Silahkan login terlebih dahulu');
            router.push('/login');
        }
    })
    useEffect(() => {
        if (domain === null) {
            alert('Domain tidak ditemukan');
            router.push('/');
        }
    },[domain]);

    return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Cari domain</h2>
        <div 
        className='flex pb-3'>
            <label className='mr-4'>
                Domain: {domain}
            </label>
            <Select
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                />
        </div>
        <div>
            <p
            className="font-bold mb-6 text-gray-800 text-center"
            >Harga: {price}</p>
        </div>
        <form className="space-y-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Pesan
          </button>
        </form>
      </div>
    </div>
    );
}
