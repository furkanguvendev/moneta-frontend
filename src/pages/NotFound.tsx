import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#04110d] text-white flex flex-col items-center justify-center p-6 selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* Arka Plan Glow Efekti */}
      <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        
        {/* İkon / Görsel Görünüm */}
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-400 text-3xl mb-6 shadow-xl shadow-emerald-500/5">
          <FaExclamationTriangle />
        </div>

        {/* 404 Kod Görünümü */}
        <span className="text-6xl font-black tracking-widest text-emerald-500 mb-2">
          404
        </span>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
          Sayfa veya Kaynak Bulunamadı
        </h1>

        <p className="text-sm text-white/60 leading-relaxed mb-8">
          Aradığınız sayfa silinmiş, adresi değiştirilmiş veya erişmeye çalıştığınız finansal veri artık mevcut olmayabilir.
        </p>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaArrowLeft className="text-xs" />
            Geri Dön
          </button>

          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <FaHome className="text-xs" />
            Ana Sayfaya Git
          </Link>
        </div>

      </div>

    </div>
  );
};