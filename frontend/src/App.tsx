import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiPartyPopper } from 'react-icons/gi';
import { Web3Provider } from "./Web3Context";
import LandingPage from "./components/LandingPage";
import WalletConnection from "./components/WalletConnection";
import EventFactory from "./components/EventFactory";

// Main App Layout Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {children}
    </div>
  );
};

// Header Component
const AppHeader: React.FC<{ showNavigation?: boolean }> = ({
  showNavigation = true,
}) => {
  // Use showNavigation parameter to avoid TypeScript warning
  console.log("Header navigation visibility:", showNavigation);
  return (
    <header className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 text-center">
        <div className="flex items-center justify-between mb-4">
          <a
            href="/"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            ← Back to Landing
          </a>
          <div></div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 flex items-center gap-3">
              <GiPartyPopper className="text-yellow-400" />
              Raffyl
            </h1>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl opacity-90">
              Spin. Win. Celebrate.
            </p>
          </div>
          <WalletConnection />
        </div>
      </div>
    </header>
  );
};

// Navigation Component
const AppNavigation: React.FC<{
  activeTab: "events" | "create";
  setActiveTab: (tab: "events" | "create") => void;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex justify-center gap-2 sm:gap-4 overflow-x-auto">
          <button
            className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base lg:text-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "events"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-transparent text-white/80 hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("events")}
          >
            Browse Raffles
          </button>
          <button
            className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base lg:text-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "create"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-transparent text-white/80 hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Host Raffle
          </button>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const AppFooter: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 text-center">
        <p className="text-white/80 text-sm sm:text-base flex items-center justify-center gap-2">
          The new way to give. Fair. Fun. For everyone.
          <GiPartyPopper className="text-yellow-400" />
        </p>
      </div>
    </footer>
  );
};

// Main App Page Component
const MainApp: React.FC = () => {
  const [params] = useSearchParams()
  const active = params.get("active") as any

  const [activeTab, setActiveTab] = useState<"events" | "create">(active ? active : "events");

  return (
    <AppLayout>
      <AppHeader />
      <AppNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {activeTab === "events" && <EventList />}
        {activeTab === "create" && <EventFactory />}
      </main>

      <AppFooter />
    </AppLayout>
  );
};

// Landing Page Component
const LandingPageWrapper: React.FC = () => {
  return (
    <>
      <LandingPage />
      {/* Floating navigation to access the app */}
      <div className="fixed top-4 right-4 z-50">
        <a
          href="/app"
          className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 text-sm font-medium"
        >
          Enter App →
        </a>
      </div>
    </>
  );
};

// Event Detail Page Wrapper
const EventDetailWrapper: React.FC = () => {
  return (
    <AppLayout>
      <AppHeader showNavigation={false} />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <EventDetail />
      </main>

      <AppFooter />
    </AppLayout>
  );
};

function App() {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageWrapper />} />
          <Route path="/app" element={<MainApp />} />
          <Route path="/event/:eventAddress" element={<EventDetailWrapper />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </Web3Provider>
  );
}

export default App;
