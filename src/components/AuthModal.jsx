import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, LogIn, UserPlus, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        if (!name.trim()) throw new Error("Please enter your full name.");
        await register(name.trim(), email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
      onClose();
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err?.message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content auth-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="auth-modal-header">
              <div className="auth-icon-box">
                {isSignUp ? <UserPlus size={24} color="#6366f1" /> : <LogIn size={24} color="#6366f1" />}
              </div>
              <h2>{isSignUp ? "Create an Account" : "Welcome Back"}</h2>
              <p>
                {isSignUp
                  ? "Sign up to track orders, save favorites, and receive personalized recommendations."
                  : "Log in to access your Lumina Books account and saved wishlist."}
              </p>
            </div>

            {error && (
              <div className="auth-error-box">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {isSignUp && (
                <div className="auth-input-group">
                  <label htmlFor="auth-name">Full Name</label>
                  <div className="auth-input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      id="auth-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div className="auth-input-group">
                <label htmlFor="auth-email">Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="auth-password">Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="auth-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{isSignUp ? "Sign Up" : "Log In"}</span>
                )}
              </button>
            </form>

            <div className="auth-modal-footer">
              <span>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </span>
              <button
                type="button"
                className="auth-switch-btn"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
