import expenseManagerLogo from "@/assets/images/ubs-logo.svg";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ApprovalsCard } from "@/components/layout/MyApprovals"


export function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header variant="home" />

            <main className="relative flex-1">

                {/* Centro real da tela */}
                <div className="absolute left-1/3 top-70 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-6">
                        <img
                            src={expenseManagerLogo}
                            alt="UBS"
                            draggable={false}
                            className="h-30 w-auto"
                        />

                        <p className="text-5xl font-thin italic text-black/70">
                            Expense Manager
                        </p>
                    </div>
                </div>

                {/* Card flutuando à direita */}
                <div className="absolute right-75 top-70 -translate-y-1/2">
                    <ApprovalsCard />
                </div>

            </main>

            <Footer variant="home" />

        </div>
    )
}

