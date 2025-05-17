// src/Menu.jsx
import React, { useRef, useEffect, useState } from "react";
import { Menu as MenuIcon, CircleUser } from "lucide-react";
import { supabase } from "./supabaseClient";

// AuthModal handles both “signup” and “login”
const AuthModal = ({ mode, onClose, onAuthSuccess }) => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    const cleaned = username.trim().toLowerCase();
    const fakeEmail = `${cleaned}@gogenius.local`;

    if (mode === "signup") {
      // ——— SIGN UP ———
      const { data: signData, error: signErr } = await supabase.auth.signUp({
        email: fakeEmail,
        password,
      });
      if (signErr) {
        setError(signErr.message);
        setLoading(false);
        return;
      }
      const { error: insertErr } = await supabase
        .from("users")
        .insert({ id: signData.user.id, name: cleaned, email: fakeEmail });
      if (insertErr) {
        setError(insertErr.message);
        setLoading(false);
        return;
      }
      // success!
      onAuthSuccess(cleaned);
    } else {
      // ——— LOGIN ———
      // 1) look up the *real* email for that username
      const { data: row, error: lookupErr } = await supabase
        .from("users")
        .select("email")
        .ilike("name", cleaned)
        .single();

      if (lookupErr || !row) {
        setError("Username not found.");
        setLoading(false);
        return;
      }

      // 2) now call the actual signInWithPassword
      const { error: loginErr } = await supabase.auth.signInWithPassword({
        email: row.email,
        password,
      });
      if (loginErr) {
        setError(loginErr.message);
        setLoading(false);
        return;
      }

      onAuthSuccess(cleaned);
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

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none"
        />

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

export default function Menu({
  isOpen,
  setIsOpen,
  authMode,
  setAuthMode,
  userName,
  setUserName,
}) {
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setIsOpen]);

  const handleAuthSuccess = (name) => {
    setUserName(name);
    setAuthMode(null);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to log out?")) return;
    await supabase.auth.signOut();
    setUserName(null);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center space-x-3 border rounded-full px-2 py-1 bg-white"
      >
        <MenuIcon className="w-5 h-5" />
        <div className="relative w-8 h-8 bg-black rounded-full flex items-center justify-center">
          {userName ? (
            <span className="text-white font-baumans text-lg">
              {userName.charAt(0).toUpperCase()}
            </span>
          ) : (
            <CircleUser className="text-white w-6 h-6" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg z-10 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {userName ? (
              <>
                <li>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Host your home
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Sign up
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
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
