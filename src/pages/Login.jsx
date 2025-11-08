import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {

    const { loginFunction, setUser, loginPopFunction, setTempEmail, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);

    const handleReset = () => {
        setTempEmail(emailRef.current.value)
    }

    const handleGoogleLogin = () => {
        loginPopFunction()
            .then((res) => {
                setUser(res.user);
                // toast.success("Logged in successfully!");
                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setError(err.code);
                setLoading(false);
                // toast.error("Failed to log in with Google.");
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        loginFunction(email, password)
            .then((res) => {
                setUser(res.user);
                // toast.success("Logged in successfully!");
                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setError(err.code);
                setLoading(false);
                // toast.error("Login failed. Please check your credentials.");
            });
    };

    return (
        <div>
            <div className="hero">
              <title>ToyTopia - Login</title>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-blue-50 w-full shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <p className="text-center text-blue-500 text-lg font-semibold mb-4">Login to Your Account</p>
                                <label className="font-semibold">
                                    <span >Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="example@email.com"
                                    className=" input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control relative">
                                <label className="font-semibold">
                                    <span >Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <span
                                    className="absolute right-2 top-8 cursor-pointer z-50"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <MdVisibility size={20} />
                                    ) : (
                                        <MdVisibilityOff size={20} />
                                    )}
                                </span>
                            </div>

                            <label className="label">
                                <Link to={"/forget-password"} onClick={handleReset} className="label-text-alt link link-hover">
                                    Forgot password?
                                </Link>
                            </label>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="form-control">
                                <button type="submit" className="btn w-full bg-blue-500 text-white hover:bg-blue-700">
                                    Login
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={handleGoogleLogin}
                                    type="button"
                                    className="btn mt-5 text-blue-500 flex items-center justify-center w-full">
                                    <img
                                        className="w-[20px] mr-2"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                                        alt="Google Logo"
                                    />
                                    Continue with Google
                                </button>
                            </div>
                        </form>

                        <p className="text-center text-blue-500 p-4">
                            Don't have an account?{" "}
                            <Link className="text-red-500 font-semibold" to="/register">
                            Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;