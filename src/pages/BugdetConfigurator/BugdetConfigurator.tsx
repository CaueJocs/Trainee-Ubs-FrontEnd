import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";

import BudgdetTable from "./BudgdetTable";
import Button from "@mui/material/Button";

export function BudgetConfigurator() {
  const [activeButton, setActivebutton] = useState<boolean>(true);

  function handleAreaClick() {
    setActivebutton(true);
  }

  function handleExpenseTypeClick() {
    setActivebutton(false);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="default" />
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-100vh w-full ">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            Bugdet Configurator{" "}
          </h1>
          <Button
            variant="contained"
            sx={{
              bgcolor: activeButton ? "var(--ubs-red)" : "var(--ubs-gray)",
              ml: 2,
              borderRadius: 5,
            }}
            onClick={handleAreaClick}
          >
            Area Bugdet
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: !activeButton ? "var(--ubs-red)" : "var(--ubs-gray)",
              ml: 2,
              borderRadius: 5,
            }}
            onClick={handleExpenseTypeClick}
          >
            Expense type Bugdet
          </Button>
          <div className="flex flex-1 items-center justify-center p-5">
            <BudgdetTable />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
