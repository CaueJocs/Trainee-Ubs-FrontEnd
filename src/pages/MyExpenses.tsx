import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { NewExpenseModal } from "@/components/ui/Modal/ModalNewExpense/NewExpenseModal";
import Button from "@mui/material/Button";

export function MyExpenses() {
  const [openNewExpense, setOpenNewExpense] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="default" />
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-100vh w-full h-96">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            My Expenses{" "}
          </h1>
          <Button variant="contained" sx={{bgcolor: "var(--ubs-red)" , ml: 2}} onClick={() => setOpenNewExpense(true)}>New expense</Button>
        {/* //The table components would probably go here */}
        </div>
        {openNewExpense && (
          <NewExpenseModal onClose={() => setOpenNewExpense(false)} />
        )}
      </main>
      <Footer />
    </div>
  );
}
