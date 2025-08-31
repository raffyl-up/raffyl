import React from "react";
import { FaGift } from "react-icons/fa";
import { LuFerrisWheel } from "react-icons/lu";
import { GiPartyPopper } from "react-icons/gi";
import { PiConfettiFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="space-y-8 animate-fade-in">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight leading-tight">
              <span className="block animate-slide-up">Spin.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-slide-up delay-200">
                Win.
              </span>
              <span className="block animate-slide-up delay-300">
                Celebrate.
              </span>
            </h1>

            {/* Subtext */}
            <div className="max-w-4xl mx-auto space-y-4 animate-slide-up delay-500">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 font-medium leading-relaxed">
                Raffyl is the fun, provably fair raffle app that makes giveaways
                instant and unforgettable.
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                Engage your audience, reward your community, and deliver
                excitement with every spin.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8 animate-slide-up delay-700">
              <button
                onClick={() => {
                  navigate("/app");
                }}
                className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-full hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 animate-pulse-glow"
              >
                <span className="relative z-10">Try Raffyl</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements - Responsive */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 text-3xl sm:text-4xl md:text-6xl animate-bounce text-yellow-400">
          <GiPartyPopper />
        </div>
        <div className="absolute top-24 sm:top-32 right-4 sm:right-16 text-2xl sm:text-3xl md:text-4xl animate-pulse text-pink-400">
          <PiConfettiFill />
        </div>
        <div className="absolute bottom-16 sm:bottom-20 left-8 sm:left-20 text-3xl sm:text-4xl md:text-5xl animate-bounce delay-1000 text-green-400">
          <FaGift />
        </div>
        <div className="absolute top-1/2 right-8 sm:right-12 text-2xl sm:text-3xl md:text-4xl animate-spin-slow text-purple-400">
          <LuFerrisWheel />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 sm:py-20 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
            Trusted by event organizers, creators, and communities to make
            giveaways fair and fun.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12">
            <div className="group flex items-center space-x-3 text-green-400 hover:text-green-300 transition-colors duration-200">
              <div className="w-3 h-3 bg-green-400 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
              <span className="text-sm sm:text-base font-medium">
                Blockchain Verified
              </span>
            </div>
            <div className="group flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-colors duration-200">
              <div className="w-3 h-3 bg-blue-400 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
              <span className="text-sm sm:text-base font-medium">
                Instant Rewards
              </span>
            </div>
            <div className="group flex items-center space-x-3 text-purple-400 hover:text-purple-300 transition-colors duration-200">
              <div className="w-3 h-3 bg-purple-400 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
              <span className="text-sm sm:text-base font-medium">
                Easy Setup
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose Raffyl?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Built for fairness, designed for fun, optimized for instant
              gratification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Feature 1: Fair & Transparent */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-green-500/25 transition-all duration-300">
                ⚖️
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                Fair & Transparent
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Every spin uses blockchain-based randomness, no rigging, no
                bias, just pure luck.
              </p>
            </div>

            {/* Feature 2: Instant Rewards */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
                ⚡
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                Instant Rewards
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Winners get their tokens immediately, no delays or messy
                logistics.
              </p>
            </div>

            {/* Feature 3: Fun & Engaging */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300">
                🎡
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                Fun & Engaging
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                The live raffle spin keeps your audience excited and cheering
                until the last winner is revealed.
              </p>
            </div>

            {/* Feature 4: Simple to Use */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-orange-500/25 transition-all duration-300">
                📱
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                Simple to Use
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Just set up, scan a QR code, and spin. Wallets today, social
                sign-ins tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-r from-purple-600/20 to-blue-600/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            Ready to bring your next giveaway to life?
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the revolution of fair, fun, and instant giveaways. Your
            community will love the excitement!
          </p>

          <div className="space-y-6">
            <button
              onClick={() => {
                navigate("/app?active=create");
              }}
              className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-5 sm:py-6 text-xl sm:text-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-full hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25"
            >
              <span className="relative z-10">Host Your First Raffle →</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            <p className="text-gray-400 text-sm sm:text-base">
              No setup fees • No hidden costs • Just pure fun
            </p>
          </div>

          <div className="mt-12 sm:mt-16">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
              The new way to give. Fair. Fun. For everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;