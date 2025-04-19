// src/Menu.jsx
import React, { useRef, useEffect, useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { CircleUser } from "lucide-react";
import { supabase } from "./supabaseClient";

// AuthModal: overlay for both sign‑up and log‑in
const AuthModal = ({ mode, onClose, onAuthSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "signup") {
      // 1) Supabase signup
      const { data: signData, error: signErr } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signErr) {
        setError(signErr.message);
      } else {
        // 2) Store username in your users table
        const { error: insertErr } = await supabase
          .from("users")
          .insert({ id: signData.user.id, name: username.trim(), email });
        if (insertErr) setError(insertErr.message);
        else setMessage("Check your email for the confirmation link.");
      }
    } else {
      // login flow: lookup email by username
      const cleaned = username.trim();
      const { data: row, error: lookupErr } = await supabase
        .from("users")
        .select("email")
        .eq("name", cleaned)
        .single();
      if (lookupErr || !row) {
        setError("Username not found.");
      } else {
        const { error: loginErr } = await supabase.auth.signInWithPassword({
          email: row.email,
          password,
        });
        if (loginErr) setError(loginErr.message);
        else {
          setMessage("Successfully logged in!");
          onAuthSuccess(cleaned);
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl w-80 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          {mode === "signup" ? "Sign Up" : "Log In"} to GoGenius
        </h2>

        {/* Username always */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none"
        />

        {/* Email only for signup */}
        {mode === "signup" && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none"
          />
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none"
        />

        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        {message && <p className="text-sm text-green-500 mb-2">{message}</p>}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-customOrange text-white rounded-lg py-2 disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Sign Up"
            : "Log In"}
        </button>
      </div>
    </div>
  );
};

// Menu / ToggleButton component
export default function Menu({
  isOpen,
  setIsOpen,
  authMode,
  setAuthMode,
  userName,
  setUserName,
}) {
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setIsOpen]);

  // Called when AuthModal succeeds
  const handleAuthSuccess = (name) => {
    setUserName(name);
    setAuthMode(null);
    setIsOpen(false);
  };

  // Logout flow
  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    await supabase.auth.signOut();
    setUserName(null);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block">
      {/* trigger button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center space-x-3 border rounded-full px-2 py-1 bg-white"
      >
        <MenuIcon className="w-5 h-5" />
        <div className="relative w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white font-baumans text-lg">
            {typeof userName === "string" && userName.length > 0 ? (
              userName.charAt(0).toUpperCase()
            ) : (
              <CircleUser />
            )}
          </span>

          <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            1
          </div>
        </div>
      </button>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg z-10 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {userName ? (
              // logged-in menu
              <>
                <li>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Account
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Host your home
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // guest menu
              <>
                <li>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    onClick={() => {
                      setAuthMode("signup");
                      setIsOpen(false);
                    }}
                  >
                    Sign up
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    onClick={() => {
                      setAuthMode("login");
                      setIsOpen(false);
                    }}
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                    Host your home
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* auth modal */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
