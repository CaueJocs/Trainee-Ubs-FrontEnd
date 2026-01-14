import { PendingApprovalsTable } from "./PendingApprovalsTable";

export function MyApprovals() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="bg-[var(--light-gray-bg)] w-100vh w-full pb-5">
          <h1 className="text-2xl font-light tracking-tight pt-5 pl-5 pb-3">
            My Approvals{" "}
          </h1>

          <div className="pl-5 pr-5">
            <PendingApprovalsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
