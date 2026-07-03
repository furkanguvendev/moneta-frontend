import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import budget from "../assets/budget.jpeg";
import { FaLinkedin, FaBriefcase, FaInfoCircle } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { type LoginData } from "../services/authService";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser, isLoading, error, clearAuthError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    clearAuthError();
    
    const fallbackTestId = 1; 
    await loginUser(data, fallbackTestId);
    
    if (useAuthStore.getState().isAuthenticated) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      
      <div className="login-info-side">
        <img src={budget} className="w-80 md:w-96 rounded-3xl shadow-2xl border-4 border-white/10 object-cover" alt="Moneta Budget"/>
        <h1 className="text-4xl lg:text-5xl font-black tracking-wider">MONETA</h1>
        <h2 className="text-sm lg:text-base font-medium text-white/90 max-w-xs leading-relaxed">FİNANSAL TAKİBİN EN SADE YOLU</h2>
        <a href="/" className="mt-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer text-white">
          Daha fazlası
        </a>
      </div>

      <div className="login-form-side">
        <form onSubmit={handleSubmit(onSubmit)} className="login-card-form">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Sign In</h2>
            <p className="text-sm text-white/60 mt-1">Sign in to stay connected.</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              <span className="text-xs text-red-400 font-medium">{error}</span>
            </div>
          )}

          <div className="login-input-group">
            <label className="text-xs font-bold uppercase tracking-wider text-white/80">Email</label>
            <input 
              type="email" 
              placeholder="example@moneta.com"
              {...register("email", { required: "This field is required" })} 
              className="login-input"
              disabled={isLoading}
            />
            {errors.email && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.email.message}</span>}
          </div>

          <div className="login-input-group">
            <label className="text-xs font-bold uppercase tracking-wider text-white/80">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              {...register("password", { required: "This field is required" })} 
              className="login-input"
              disabled={isLoading}
            />
            {errors.password && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.password.message}</span>}
          </div>

          <div className="w-full flex justify-between items-center text-xs text-white/70 pt-1">
            <div className="flex items-center gap-x-2 cursor-pointer select-none">
              <input type="checkbox" id="rememberMe" className="w-4 h-4 rounded bg-white/10 border-white/20 text-emerald-500 focus:ring-0 cursor-pointer" />
              <label htmlFor="rememberMe" className="cursor-pointer">Remember me?</label>
            </div>
            <a href="/forgot-password" className="hover:underline font-semibold text-white/90">Forgot Password</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full block text-center mt-2 py-3.5 bg-white text-[#062419] hover:bg-white/90 font-bold text-sm rounded-xl transition-all duration-200 shadow-lg active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button> 
        </form>

        <div className="flex flex-col items-center justify-center mt-8 gap-y-3 w-full max-w-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Social Media</h3>
          <div className="flex flex-row gap-x-4 text-xl">
            <a href="" title="Portfolio" className="login-social-btn"><FaBriefcase /></a>
            <a href="" title="Linkedin" className="login-social-btn"><FaLinkedin /></a>
            <a href="" title="About Me" className="login-social-btn"><FaInfoCircle /></a>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/60 text-center w-full max-w-sm">
          <span>Don't have an account? </span>
          <a href="/register" className="text-white font-bold hover:underline ml-1">Click here to sign up.</a>
        </div>
      </div>

    </div>
  );
};