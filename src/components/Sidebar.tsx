import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`
      sidebar-container
      fixed inset-y-0 left-0 z-50 w-64 h-full
      transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out
      lg:relative lg:translate-x-0 lg:h-screen lg:sticky lg:top-0 lg:flex
    `}>
      <div>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="font-black text-2xl tracking-wider text-emerald-400">
            MONETA
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link" onClick={onClose}>Dashboard</Link>
          <Link to="/Transactions" className="sidebar-link" onClick={onClose}>Transactions</Link>
          <Link to="/wallets" className="sidebar-link" onClick={onClose}>Wallets</Link>
          <Link to="/investments" className="sidebar-link" onClick={onClose}>Yatırımlar</Link> {/* <-- EKLENDİ */}
          <Link to="/profile" className="sidebar-link" onClick={onClose}>Profile</Link>
        </nav>
      </div>

      <button onClick={handleLogout} className="btn-logout">
        Log Out
      </button>
    </div>
  );
};