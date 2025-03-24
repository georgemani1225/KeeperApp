import { Link } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { name, email, password } = formData;
        if (!name || !email || !password) {
            alert("All fields are required")
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log("Error: ", error.message);
            toast.error(error.data.message)
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg outline-none"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#f5ba13] text-black p-2 rounded-lg hover:bg-[#f5ba13] transition-all"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#f5ba13] hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
            <Toaster />
        </div>
    );
};

export default Signup;