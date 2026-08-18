import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import budget from "../assets/budget.jpeg";
import { FaLinkedin, FaBriefcase, FaInfoCircle } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { type LoginData } from "../services/authService";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser, isLoading, error, clearAuthError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    clearAuthError();
    await loginUser(data);
    
    if (useAuthStore.getState().isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="login-container min-h-screen flex flex-col md:flex-row bg-[#04110d] text-white">
      
      {/* Sol Panel - Tanıtım / Branding */}
      <div className="login-info-side flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0b3324] to-[#04110d] text-center border-b md:border-b-0 md:border-r border-emerald-950/40">
        <img 
          src={budget} 
          className="w-80 md:w-96 rounded-3xl shadow-2xl border-4 border-white/10 object-cover mb-6" 
          alt="Moneta Budget"
        />
        <h1 className="text-4xl lg:text-5xl font-black tracking-wider text-emerald-400 mb-2">MONETA</h1>
        <h2 className="text-sm lg:text-base font-medium text-white/90 max-w-xs leading-relaxed mb-6">
          FİNANSAL TAKİBİN EN SADE YOLU
        </h2>
        <Link 
          to="/" 
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer text-white"
        >
          Daha fazlası
        </Link>
      </div>

      {/* Sağ Panel - Giriş Formu */}
      <div className="login-form-side flex-1 flex flex-col items-center justify-center p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="login-card-form w-full max-w-sm space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold tracking-tight">Sign In</h2>
            <p className="text-sm text-white/60 mt-1">Sign in to stay connected.</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              <span className="text-xs text-red-400 font-medium">{error}</span>
            </div>
          )}

          <div className="login-input-group flex flex-col space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/80">Email</label>
            <input 
              type="email" 
              placeholder="example@moneta.com"
              {...register("email", { required: "This field is required" })} 
              className="login-input px-4 py-2.5 bg-[#04110d] border border-emerald-950/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50"
              disabled={isLoading}
            />
            {errors.email && <span className="text-xs text-red-400 font-medium">{errors.email.message}</span>}
          </div>

          <div className="login-input-group flex flex-col space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/80">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              {...register("password", { required: "This field is required" })} 
              className="login-input px-4 py-2.5 bg-[#04110d] border border-emerald-950/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50"
              disabled={isLoading}
            />
            {errors.password && <span className="text-xs text-red-400 font-medium">{errors.password.message}</span>}
          </div>

          <div className="w-full flex justify-between items-center text-xs text-white/70 pt-1">
            <label className="flex items-center gap-x-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                id="rememberMe" 
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-emerald-500 focus:ring-0 cursor-pointer" 
              />
              <span className="cursor-pointer">Remember me?</span>
            </label>
            <Link to="/forgot-password" className="hover:underline font-semibold text-white/90">
              Forgot Password
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full block text-center mt-2 py-3.5 bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold text-sm rounded-xl transition-all duration-200 shadow-lg active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button> 
        </form>

        <div className="flex flex-col items-center justify-center mt-8 gap-y-3 w-full max-w-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Social Media</h3>
          <div className="flex flex-row gap-x-4 text-xl">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="Portfolio" className="login-social-btn hover:text-emerald-400 transition-colors">
              <FaBriefcase />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="Linkedin" className="login-social-btn hover:text-emerald-400 transition-colors">
              <FaLinkedin />
            </a>
            <a href="/" title="About Me" className="login-social-btn hover:text-emerald-400 transition-colors">
              <FaInfoCircle />
            </a>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/60 text-center w-full max-w-sm">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-emerald-400 font-bold hover:underline ml-1">
            Click here to sign up.
          </Link>
        </div>
      </div>

    </div>
  );
};