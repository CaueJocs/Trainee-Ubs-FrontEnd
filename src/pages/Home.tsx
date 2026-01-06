import expenseManagerLogo from "@/assets/images/ubs-expense-manager-logo.png";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PendingApprovalsTable } from "@/components/layout/PendingApprovalsTable"


export function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header variant="default" />

            <main className="flex flex-1 flex-col sm:flex-row items-center">

                {/* Logo */}
                <div className="hidden md:flex lg:w-1/2 items-center justify-center p-4">
                    <img
                        src={expenseManagerLogo}
                        alt="UBS"
                        draggable={false}
                        className="max-h-30 w-auto"
                    />
                </div>

                {/* Table */}
                <div className="flex w-full lg:w-1/2 items-center justify-center p-4">
                    <PendingApprovalsTable />
                </div>

            </main>

            <Footer />

        </div>
    )
}

