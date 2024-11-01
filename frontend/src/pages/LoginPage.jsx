import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';


const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignin = () => {
        setLoading(true);
        const data = {
            email,
            password,
        };
    
        axios.post('http://localhost:5555/', data)
            .then((response) => {
                setLoading(false);
                if (response.data.status === 'ok') {
                    localStorage.setItem('token', response.data.user);
                    navigate('/Home');
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                setLoading(false); // Stop loading if an error occurs
                alert("An error occurred");
                console.error(error);
            });
    };
    

    return (
        <div className='p-4 flex items-center justify-center h-screen'>
        {loading ? (<Loading/>):(
            <div className='p-4'>
            <div className=' flex flex-col border-sky-300 rounded-xl w-[600px] p-4 mx-auto'>
                <h1 class="font-bold leading-snug tracking-tight text-slate-800 mx-auto my-6 w-full text-2xl lg:max-w-3xl lg:text-5xl">
                    Login
                </h1>


                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Email
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Password
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                <button class="rounded-md border mt-4 border-slate-300 py-3 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                type="button" onClick={handleSignin}>
                    <label class="block uppercase tracking-wide text-xs font-bold" for="grid-first-name">
                        Login
                    </label>
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400 my-4">
                    Don’t have an account yet?   
                    <Link to={`/register`}>
                        <a class="font-medium text-blue-500 hover:underline dark:text-primary-500">   Sign up</a>
                    </Link>
                </p>
            </div>
        </div>)}
    </div>
    )
}

export default LoginPage
