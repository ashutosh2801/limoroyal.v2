"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main>
      
      <div className='relative'>
        <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
        <div className='relative z-10 pt-50 lg:pt-80 pb-30'>
          <div className='container mx-auto px-2'>
            <div>
              <ul className='breadcrumb uppercase webColor text-sm flex'>
                <li><a href='/'>Home</a></li>
                <li>Login</li>
              </ul>
            </div>
            <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>
              Login
            </h2>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="flex items-center justify-center px-4 relative mt-20 lg:mt-0 mb-15 lg:mb-0">
        <div className="relative z-10 w-full max-w-lg bg-[#0a0a0a] backdrop-blur-xl border border-gray-900 rounded-2xl p-4 md:p-8 shadow-2xl">

          {/* ================= FORGOT PASSWORD ================= */}
          {isForgotPassword ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  Forgot Password
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Enter your email and we'll send you a password reset link.
                </p>
              </div>

              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-3 mt-2 webBG text-white font-semibold rounded-lg transition cursor-pointer"
                >
                  Send Reset Link
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm mt-6">
                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="webColor hover:underline font-medium cursor-pointer"
                >
                  Go back to Login
                </button>
              </p>
            </>
          ) : (
            <>
              {/* ================= LOGIN / SIGNUP ================= */}

              {/* Title */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  {isLogin ? "Log in and get exploring" : "Sign Up"}
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  {isLogin
                    ? "Log into your account with your email, or create one below."
                    : "Create a new account by filling the form below."}
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4">

                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-12 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full px-4 py-3 pr-12 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="accent-yellow-800" />
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="webColor hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 mt-2 webBG text-white font-semibold rounded-lg transition hover:opacity-90 cursor-pointer"
                >
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm mt-6">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="webColor hover:underline font-medium cursor-pointer"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
