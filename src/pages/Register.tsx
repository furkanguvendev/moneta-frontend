import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import budget from "../assets/register-bg.jpg";
import { useAuthStore } from "../store/useAuthStore";

type RegisterFormInputs = {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  surname: string;
};

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser, isLoading, error, clearAuthError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    clearAuthError();

    const requestData = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.surname,
    };

    await registerUser(requestData, () => {
      alert("Kayıt işlemi başarıyla tamamlandı! Giriş sayfasına yönlendiriliyorsunuz.");
      navigate("/login");
    });
  };

  return (
    <div
      className="auth-container min-h-screen bg-cover bg-center flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-zinc-950"
      style={{ backgroundImage: `url(${budget})` }}
    >
      <div className="auth-overlay"></div>

      <div className="auth-card relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="auth-title">Kayıt Ol</h1>
          <p className="text-sm text-white/60 mt-1">
            Moneta ile finansal kontrolü eline al.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
            <span className="text-xs text-rose-400 font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="auth-label">Ad</label>
              <input
                {...register("firstName", { required: "Ad alanı zorunludur" })}
                type="text"
                placeholder="John"
                className="auth-input"
                disabled={isLoading}
              />
              {errors.firstName && (
                <span className="auth-error">{errors.firstName.message}</span>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <label className="auth-label">Soyad</label>
              <input
                {...register("surname", { required: "Soyad alanı zorunludur" })}
                type="text"
                placeholder="Doe"
                className="auth-input"
                disabled={isLoading}
              />
              {errors.surname && (
                <span className="auth-error">{errors.surname.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="auth-label">Kullanıcı Adı</label>
            <input
              {...register("userName", { required: "Kullanıcı adı zorunludur" })}
              type="text"
              placeholder="johndoe99"
              className="auth-input"
              disabled={isLoading}
            />
            {errors.userName && (
              <span className="auth-error">{errors.userName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="auth-label">E-posta</label>
            <input
              {...register("email", {
                required: "E-posta zorunludur",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Geçerli bir e-posta giriniz",
                },
              })}
              type="email"
              placeholder="john@example.com"
              className="auth-input"
              disabled={isLoading}
            />
            {errors.email && (
              <span className="auth-error">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="auth-label">Şifre</label>
            <input
              {...register("password", {
                required: "Şifre zorunludur",
                minLength: {
                  value: 6,
                  message: "Şifre en az 6 karakter olmalıdır",
                },
              })}
              type="password"
              placeholder="••••••••"
              className="auth-input"
              disabled={isLoading}
            />
            {errors.password && (
              <span className="auth-error">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-btn disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/60">
            Zaten bir hesabın var mı?{" "}
            <Link to="/login" className="auth-link">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};