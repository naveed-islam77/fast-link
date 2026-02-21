"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { useCreateAdminMutation } from "@/store/services/admin";
import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiUserPlus,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

export default function CreateAdmin() {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Hello");
    try {
      await createAdmin({ email, password }).unwrap();
      setAlert({ type: "success", message: "Admin created successfully!" });
      setEmail("");
      setPassword("");
    } catch (error) {
      setAlert({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex bg-linear-to-br from-indigo-100 via-white to-purple-100">
      <AdminSidebar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
              <FiUserPlus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Create Admin Account
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Set up a new administrator for your platform
            </p>
          </div>

          {/* Alert Messages */}
          {alert && (
            <div
              className={`mb-6 p-4 rounded-xl ${
                alert.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center">
                {alert.type === "success" ? (
                  <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                ) : (
                  <FiAlertCircle className="w-5 h-5 text-red-500 mr-3" />
                )}
                <p
                  className={`text-sm font-medium ${
                    alert.type === "success" ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {alert.message}
                </p>
              </div>
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 hover:bg-white focus:bg-white"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 hover:bg-white focus:bg-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 hover:text-indigo-600 focus:outline-none"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Use at least 8 characters with a mix of letters, numbers &
                    symbols
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiUserPlus className="mr-2 h-4 w-4" />
                      Create Admin Account
                    </>
                  )}
                </button>
              </form>

              {/* Security Note */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs font-medium text-gray-800">
                      Security Note
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      This action will create a new administrator account with
                      full platform access. Please ensure you have the necessary
                      permissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
