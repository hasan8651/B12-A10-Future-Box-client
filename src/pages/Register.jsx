import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUserFunction, setUser, updateProfileFunction, loginPopFunction } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleGoogleLogin = () => {
    loginPopFunction()
      .then((res) => {
        setUser(res.user);
        // toast.success("Logged in successfully!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.code);
        // toast.error("Failed to log in with Google.");
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    if (!passwordValidation(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }
    setPasswordError("");

    createUserFunction(email, password)
      .then((res) => {
        //  setUser(res.user);
        return updateProfileFunction({
          displayName: name,
          photoURL: photoURL,
        });
      })
      .then(() => {
        // toast.success("Successfully Registered!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.code);
        // toast.error("Registration failed. Please try again.");
      });
  };

  return (
    <div>
      <Helmet><title>ToyTopia - Register</title></Helmet>
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="card bg-blue-50 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <p className="text-center text-blue-500 font-semibold text-lg mb-4">Register Your Account</p>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered pr-10"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-50"
                  >
                    {showPassword ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
                  </span>
                </div>
                {passwordError && <p className="text-red-500 text-sm max-w-[280px]">{passwordError}</p>}
                {error && <p className="text-red-500 text-sm max-w-[280px]">{error}</p>}
              </div>
              <div className="form-control">
                <button type="submit" className="btn w-full bg-blue-500 text-white hover:bg-blue-700">
                  Register
                </button>
              </div>
              <div>

                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="btn mt-5 text-blue-500 flex items-center justify-center w-full"
                >
                  <img
                    className="w-5 mr-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                    alt="Google Logo"
                  />
                  Continue with Google
                </button>
              </div>
            </form>
            <p className="text-blue-500 text-center p-4">
              Already have an account?{' '}
              <Link className="text-red-500 font-semibold" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;