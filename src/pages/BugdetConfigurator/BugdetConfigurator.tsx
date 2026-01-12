import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import BudgdetTable from "./BudgdetTable";


export function BudgetConfigurator() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="default" />
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-100vh w-full pb-5">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            Bugdet Configurator{" "}
          </h1>
          <div className="flex flex-1 items-center justify-center p-5">
            <BudgdetTable />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
