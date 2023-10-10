"use client";
import { Navbar } from "@/components/Navbar";
import { Tab } from "@headlessui/react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const cookies = parseCookies();

export default function Login() {
    const router = useRouter();
    const [index, setIndex] = useState<number>(0);

    const [userRegister, setUserRegister] = useState({
        name: "Lucas Silva",
        nick: "lucas",
        email: "lucas@gmail.com",
        password: "Password@123",
    });
    const [login, setLogin] = useState({
        email: "alvaromartinezferreira@gmail.com",
        password: "Password@123",
    });
    const [error, setError] = useState(null);
    const handleLoginPasswordChange = (event: any) => {
        setLogin({
            email: login.email,
            password: event.target.value,
        });
    };
    const handleLoginEmailChange = (event: any) => {
        setLogin({
            email: event.target.value,
            password: login.password,
        });
    };

    const handleUserNameChange = (event: any) => {
        setUserRegister({
            name: event.target.value,
            nick: userRegister.nick,
            email: userRegister.email,
            password: userRegister.password,
        });
    };
    const handleUserNickChange = (event: any) => {
        setUserRegister({
            name: userRegister.name,
            nick: event.target.value,
            email: userRegister.email,
            password: userRegister.password,
        });
    };
    const handleUserEmailChange = (event: any) => {
        setUserRegister({
            name: userRegister.name,
            nick: userRegister.nick,
            email: event.target.value,
            password: userRegister.password,
        });
    };
    const handleUserPasswordChange = (event: any) => {
        setUserRegister({
            name: userRegister.name,
            nick: userRegister.nick,
            email: userRegister.email,
            password: event.target.value,
        });
    };

    const handleRegister = (event: any) => {
        event.preventDefault();
        const apiUrl = `http://localhost:3000/api/user/register`;
        axios
            .post(apiUrl, userRegister)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleLogin = async (event: any) => {
        event.preventDefault();
        const apiUrl = `http://localhost:3000/api/user/login`;
        try{
            const {data} = await axios.post(apiUrl, login)
            setCookie(null, "auth", data.token, {
                maxAge: 3600,
                path: "/",
            });
            router.push('/');
        }catch(err){
            console.log(err);
        }
    };
    return (
        <div>
            <Navbar></Navbar>
            <article className="flex gap-4 mt-6 min-h-full">
                <div className="w-1/2 flex flex-col items-center bg-gray-950 text-white">
                    <Image
                        src="/logo_white.png"
                        width={100}
                        height={100}
                        alt="logo"
                    />
                    <p className="text-center">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Sapiente, quas? Dolor facilis asperiores,
                        quibusdam, perspiciatis eos esse modi repudiandae quia
                        iure rem illum autem. Voluptates fugiat quisquam
                        expedita dicta eaque?
                    </p>
                </div>
                <div className="w-1/2 min-h-full flex flex-col items-center gap-2 bg-slate-50 rounded">
                    <Tab.Group
                        vertical
                        onChange={(_index) => {
                            setIndex(_index);
                        }}
                    >
                        <Tab.List
                            className={`bg-slate-50 font-semibold flex gap-4 mt-4`}
                        >
                            <Tab
                                className={`px-3 py-1 rounded-sm ${
                                    index == 0 && "bg-indigo-200"
                                }`}
                            >
                                Cadastro
                            </Tab>
                            <Tab
                                className={`px-3 py-1 rounded-sm ${
                                    index == 1 && "bg-indigo-200"
                                }`}
                            >
                                Login
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="relative rounded-sm flex flex-col bg-slate-50 p-2 items-center gap-3 w-full">
                            <Tab.Panel className="relative rounded-sm flex flex-col bg-slate-50 w-full gap-4 p-2 items-center justify-center">
                                <div className="flex items-center flex-col gap-1">
                                    <h1 className="text-2xl font-black">
                                        Cadastro
                                    </h1>
                                    <Image
                                        src="/logo_black.png"
                                        width={100}
                                        height={100}
                                        alt="logo"
                                    />
                                </div>
                                <div className="relative w-11/12">
                                    <p>Nome Completo:</p>
                                    <input
                                        type="text"
                                        className="border-solid border-2 rounded border-slate-950 w-full"
                                        value={userRegister.name}
                                        onChange={handleUserNameChange}
                                    />
                                    <p>Nick:</p>
                                    <input
                                        type="text"
                                        className="border-solid border-2 rounded border-slate-950 w-full"
                                        value={userRegister.nick}
                                        onChange={handleUserNickChange}
                                    />
                                    <p className="top-4">Email:</p>
                                    <input
                                        type="text"
                                        className="border-solid border-2 rounded border-slate-950 w-full"
                                        value={userRegister.email}
                                        onChange={handleUserEmailChange}
                                    />
                                    <p>Senha</p>
                                    <input
                                        type="text"
                                        className="border-solid border-2 rounded border-slate-950 w-full"
                                        value={userRegister.password}
                                        onChange={handleUserPasswordChange}
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        onClick={handleRegister}
                                        className="bg-indigo-700 px-4 py-1 text-white rounded"
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel className="relative rounded-sm flex flex-col bg-slate-50 w-full gap-4 p-2 items-center justify-center">
                                <div className="flex items-center flex-col gap-1">
                                    <h1 className="text-2xl font-black">
                                        Login
                                    </h1>
                                    <Image
                                        src="/logo_black.png"
                                        width={100}
                                        height={100}
                                        alt="logo"
                                    />
                                </div>
                                <div className="relative w-11/12">
                                    <p>Email:</p>
                                    <input
                                        type="text"
                                        className="border-solid border-2 rounded border-slate-950 w-full"
                                        value={login.email}
                                        onChange={handleLoginEmailChange}
                                    />
                                    <p>Senha</p>
                                    <input
                                        type="text"
                                        className="border-solid border-2 rounded border-slate-950 w-full"
                                        value={login.password}
                                        onChange={handleLoginPasswordChange}
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        onClick={handleLogin}
                                        className="bg-indigo-700 px-4 py-1 text-white rounded"
                                    >
                                        Entrar
                                    </button>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </article>
        </div>
    );
}
