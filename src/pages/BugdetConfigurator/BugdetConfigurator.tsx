import BudgdetTable from "./BudgdetTable";

export function BudgetConfigurator() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-full h-auto">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            Bugdet Configurator
          </h1>
          <section className="flex flex-1 items-center justify-center p-2 sm:p-4">
            <BudgdetTable />
          </section>
        </div>
      </main>
    </div>
  );
}
