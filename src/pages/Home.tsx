import expenseManagerLogo from "@/assets/images/ubs-expense-manager-logo.png";

import { PendingApprovalsTable } from "@/components/layout/PendingApprovalsTable";

export function Home() {
  return (
    <div className="w-full pt-24">
      <div className="flex flex-col sm:flex-row">
        {/* Logo */}
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center p-4">
          <img
            src={expenseManagerLogo}
            alt="UBS"
            draggable={false}
            className="max-h-30 w-auto"
          />
        </div>

        {/* Table */}
        <div className="flex w-full lg:w-1/2 justify-center p-4">
          <PendingApprovalsTable />
        </div>
      </div>
    </div>
  );
}


