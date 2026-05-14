import { useState, type ChangeEvent } from "react";
import Input from "../../shared/Input";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-white">
     <div className="max-w-lg p-6 border border-zinc-400 rounded-md">
       <h2 className="text-xl mb-6">Login</h2>
      <form action="" className="space-y-6">
        <Input placeholder="Email" name="email" onChange={handleChange} />
        <Input placeholder="Password" name="password" onChange={handleChange} />
        <button type="submit" className="bg-indigo-500 px-2 py-1 rounded-md text-white hover:bg-indigo-700">Login</button>
      </form>
      <p className="mt-6 text-slate-500">If you dont have an account <Link to={"/register"} className="underline"> click here</Link> to create.</p>
     </div>
    </section>
  );
};

export default Login;
