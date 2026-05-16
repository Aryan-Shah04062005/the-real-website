import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, Briefcase, Settings, LogOut, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tighter">THE REAL <span className="text-xs font-normal text-neutral-500">ADMIN</span></h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" to="/admin" />
          <NavItem icon={<Users size={20} />} label="Founders" to="/admin/founder" />
          <NavItem icon={<Briefcase size={20} />} label="Services" to="/admin/services" />
          <NavItem icon={<MessageSquare size={20} />} label="Contacts" to="/admin/contacts" />
          <NavItem icon={<Settings size={20} />} label="Settings" to="/admin/settings" />
        </nav>

        <button 
          onClick={handleLogout}
          className="m-4 p-3 flex items-center gap-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          {/* Add more admin routes here */}
        </Routes>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, to }) => (
  <Link 
    to={to} 
    className="flex items-center justify-between p-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all group"
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </Link>
);

const DashboardOverview = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard label="Total Submissions" value="128" />
      <StatCard label="Live Visitors" value="1,204" />
      <StatCard label="Active Services" value="8" />
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="p-6 rounded-2xl glass border border-white/10">
    <p className="text-neutral-400 text-sm font-medium uppercase tracking-wider">{label}</p>
    <h3 className="text-4xl font-bold mt-2">{value}</h3>
  </div>
);

export default AdminDashboard;
