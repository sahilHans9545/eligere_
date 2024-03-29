import React, { useState } from "react";

import Otp from "./Otp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { backendUrl } from "../backendUrl";

const Signup = () => {
  const [otpSend, setOtpSend] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const checkValidation = () => {
    let fullnameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;

    if (!fullname.match(fullnameRegex)) {
      toast.error(
        "Please enter a valid full name containing only letters and spaces."
      );
      return false;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    const validatePhoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;
    if (!validatePhoneNumberRegex.test(phoneNumber)) {
      toast.error("Enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!checkValidation()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/register`, {
        fullname,
        email,
        phoneNumber,
      });
      console.log(response.data);
      toast.success(response.data.message);

      setOtpSend(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <ToastContainer />
      {!otpSend ? (
        <div className="text-white flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-medium leading-6 "
                  >
                    Phone number
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    autoComplete="current-password"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name=""
                  id="Remember"
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="Remember" className="cursor-pointer">
                  Remember me
                </label>
              </div>

              <div>
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#69a52a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#478705] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                )}
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-blue-400 hover:text-blue-300">
              {/* <Link to="/login"> Already have an account? </Link> */}
            </p>
          </div>
        </div>
      ) : (
        <Otp email={email} fullname={fullname} phoneNumber={phoneNumber} />
      )}
    </div>
  );
};

export default Signup;
