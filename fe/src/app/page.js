"use client"
import Link from "next/link";
import { useState } from "react";
// import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [domain, setDomain] = useState();
  // const [isAvailable, setIsAvailable] = useState();
  // const cookies = useCookies();
  const router = useRouter();
  const [query, setQuery] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(query);
    try{
      fetch(`/api/domain?url=https://portal.qwords.com/apitest/whois.php?domain=${query}`)
      .then((res) => {console.log(res); 
        if (res.ok){
          return res.json();
        }
        else{
          throw new Error('Error fetching data');
        }
        })
      .then((data) => {
        setDomain(data);
        // setIsAvailable(data.status);
        console.log(data)
      });
    }
    catch (error){
      console.error(error);
    }
    
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleOrder = (event) => {
    event.preventDefault();
    console.log('buying domain');
    // const token = cookies.get('token');
    // const user = cookies.get('user');
    // router.push({
    //   pathname: '/order',
    //   query: {query},
    //   // query: { token, user },
    // });
    
    router.push('/order?domain=' + query);
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Cari domain</h2>
        <form className="space-y-6">
          <div>
            <input
              id="domain"
              type="text"
              value={query}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="cari domain"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cari
          </button>
        </form>
        {
          domain && (
            <div className="py-4 my-3">
              {/* <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Hasil</h2> */}
              <div>
                <p>Domain: {query}</p>
                <p>Status: {domain.status}</p>
                {domain.status === 'available' ? 
                
                <div>
                  <p>Domain tersedia</p> 
                  
                  <button
                    type="submit"
                    onClick={handleOrder}
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Pesan
                  </button>
                </div>
                : 
                <p>Domain tidak tersedia</p>}
              </div>
            </div>
          )
        }
      </div>
    </div>
    );
}
