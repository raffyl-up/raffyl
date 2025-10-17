import { Header } from "@/components/Header";
import { CreateRaffleForm } from "@/components/create-raffle/CreateRaffleForm";

export default function CreateRafflePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-dark-bg overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Create a New Raffle
            </h2>
            <CreateRaffleForm />
          </div>
        </div>
      </div>
    </div>
  );
}