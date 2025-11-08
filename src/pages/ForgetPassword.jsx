import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';

import { Helmet } from 'react-helmet-async';

const ForgetPassword = () => {
  const { tempEmail, PassResetFunction } = useContext(AuthContext);
  const [email, setEmail] = useState(tempEmail || "");

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      // toast.error("Please enter your email address");
      return;
    }

    try {
      await PassResetFunction(email);
      // toast.success("Please Check Your e-Mail.");
      setTimeout(() => {
        window.open("https://mail.google.com", "_blank");
      }, 1500);
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <div className="hero">
       <Helmet><title>ToyTopia - Forget Password</title></Helmet>
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="card bg-blue-50 shrink-0 shadow-2xl">
          <form onSubmit={handleReset} className="card-body">
            <p className="text-center text-blue-500 text-lg mb-4 font-semibold">
              Forgot Password
            </p>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-4">
              <button
                type="submit" className="btn w-full bg-blue-500 text-white hover:bg-blue-700">
                Reset Password
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="btn mb-4 bg-blue-500 text-white hover:bg-blue-700">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;