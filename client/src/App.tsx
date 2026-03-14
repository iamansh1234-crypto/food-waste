import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, List, BarChart3, User } from 'lucide-react';
import StudentHome from './pages/StudentHome';
import StaffPrep from './pages/StaffPrep';
import AdminDashboard from './pages/AdminDashboard';
import MenuSchedule from './pages/MenuSchedule';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Attend from './pages/Attend';
import QRCodePage from './pages/QRCodePage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

function TopBar() {
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-surface-100 sticky top-0 z-10 shadow-sm">
      <div className="max-w-md mx-auto px-4 sm:max-w-3xl lg:max-w-5xl">
        <div className="flex items-center justify-between py-3">

          {/* Clickable Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-primary-500 text-white p-1.5 rounded-md">
              <Home size={20} />
            </div>
            <h1 className="font-bold text-lg text-surface-900 leading-none">
              OptiMeal
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-sm text-surface-500">
              {isAuthenticated ? `Hi, ${user?.name}` : 'Ready to reduce waste'}
            </div>

            {isAuthenticated && (
              <button
                onClick={signOut}
                className="bg-surface-100 text-surface-700 px-3 py-1 rounded-md hover:bg-surface-200 text-xs"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function BottomNav() {
  const location = useLocation();

  const tabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/menu', label: 'Menu', icon: List },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-surface-200 bg-white z-20">
      <div className="max-w-md mx-auto px-4 sm:max-w-3xl lg:max-w-5xl">
        <div className="flex justify-between">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.to;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-surface-500 hover:text-surface-800'
                }`}
              >
                <Icon size={18} />
                <span className="mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col font-sans max-w-md mx-auto sm:max-w-3xl lg:max-w-5xl bg-surface-50">
      <TopBar />

      <main className="flex-1 p-4 pb-28 overflow-y-auto">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StudentHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <MenuSchedule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/staff"
            element={
              <ProtectedRoute>
                <StaffPrep />
              </ProtectedRoute>
            }
          />

          <Route
            path="/qrcode"
            element={
              <ProtectedRoute>
                <QRCodePage />
              </ProtectedRoute>
            }
          />

          <Route path="/attend" element={<Attend />} />
        </Routes>
      </main>

      {!isAuthRoute && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;