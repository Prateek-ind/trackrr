import { useState, type ChangeEvent } from "react";
import Input from "../../shared/Input";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerData, seRegisterData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    seRegisterData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section className="w-full h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg p-6 border border-zinc-400 rounded-md">
        <h2 className="text-xl mb-6">Register</h2>
        <form action="" className="space-y-6">
          <Input
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <Input placeholder="Email" name="email" onChange={handleChange} />
          <Input
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-indigo-500 px-2 py-1 rounded-md text-white hover:bg-indigo-700"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-slate-500">If you have an account <Link to={"/login"} className="underline"> click here</Link> to login.</p>
      </div>
    </section>
  );
};

export default Register;
