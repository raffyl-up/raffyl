import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Organizations } from "@/components/Organizations";
import { TrendingRaffles } from "@/components/TrendingRaffles";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-dark-bg overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Hero />
            <div className="flex px-4 py-3 justify-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-dark-secondary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-dark-secondary/80 transition-colors">
                <span className="truncate">Learn More</span>
              </button>
            </div>
            <Organizations />
            <TrendingRaffles />
            <CTASection />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}