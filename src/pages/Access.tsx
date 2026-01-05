import { useMemo, useState } from "react";
import { Plus, Pencil, XCircle, ArrowRight } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type AccessRow = {
  id: number;
  name: string;
  email: string;
  manager: string;
  area: string;
};

type NewUserForm = {
  email: string;
  name: string;
  password: string;
  manager: string;
  area: string;
};

const emptyForm: NewUserForm = {
  email: "",
  name: "",
  password: "",
  manager: "",
  area: "",
};

export function Access() {
  const data = useMemo<AccessRow[]>(
    () => [
      {
        id: 1395,
        name: "Jose Silva",
        email: "jose.silva@ubs.com",
        manager: "Leandro Andrade",
        area: "LFG",
      },
    ],
    []
  );

  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");

  const filtered = useMemo(() => {
    const n = nameFilter.trim().toLowerCase();
    const e = emailFilter.trim().toLowerCase();

    return data.filter((row) => {
      const okName = !n || row.name.toLowerCase().includes(n);
      const okEmail = !e || row.email.toLowerCase().includes(e);
      return okName && okEmail;
    });
  }, [data, nameFilter, emailFilter]);

  // Drawer state
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [form, setForm] = useState<NewUserForm>(emptyForm);

  function openNewUser() {
    setForm(emptyForm);
    setIsNewUserOpen(true);
  }

  function closeNewUser() {
    setIsNewUserOpen(false);
  }

  function onChange<K extends keyof NewUserForm>(key: K, value: NewUserForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave(mode: "save" | "saveAndCreate") {
    // TODO: integrar com backend depois
    console.log("NEW USER:", form, "MODE:", mode);

    if (mode === "save") {
      closeNewUser();
      return;
    }

    // saveAndCreate: mantém aberto e limpa o form para cadastrar outro
    setForm(emptyForm);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="relative flex-1 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {/* Faixa cinza com título + filtros */}
          <section className="mt-6 rounded-sm bg-[#F2F2F7] px-4 py-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-sm font-medium text-black/70">
                Access Management
              </h2>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <input
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="Insert an username"
                  className="h-9 w-full rounded-[2px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/20 sm:w-[180px]"
                />

                <input
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  placeholder="Insert an email"
                  className="h-9 w-full rounded-[2px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/20 sm:w-[180px]"
                />

                {/* Search com tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label="Buscar"
                      className="h-9 rounded-[2px] border border-black/10 bg-white px-4 text-sm font-medium text-black/70 hover:bg-black/[0.03]"
                    >
                      Search
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    sideOffset={8}
                    className="rounded-md border border-black/10 bg-white px-3 py-1 text-xs text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                  >
                    Buscar
                  </TooltipContent>
                </Tooltip>

                {/* Add user com tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label="Adicionar usuário"
                      onClick={openNewUser}
                      className="ml-0 inline-flex h-9 w-9 items-center justify-center rounded-[2px] bg-red-600 text-white hover:bg-red-700 sm:ml-2"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    sideOffset={8}
                    className="rounded-md border border-black/10 bg-white px-3 py-1 text-xs text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                  >
                    Adicionar usuário
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </section>

          {/* Tabela */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#F2F2F7] text-black/50">
                  <th className="px-6 py-3 text-left font-medium">Id</th>
                  <th className="px-6 py-3 text-left font-medium">Name</th>
                  <th className="px-6 py-3 text-left font-medium">Email</th>
                  <th className="px-6 py-3 text-left font-medium">Manager</th>
                  <th className="px-6 py-3 text-left font-medium">Area</th>
                  <th className="px-6 py-3 text-right font-medium"></th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-black/10 bg-[#F2F2F7] text-black/80"
                  >
                    <td className="px-6 py-4">{row.id}</td>
                    <td className="px-6 py-4">{row.name}</td>

                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="underline decoration-black/30 underline-offset-2 hover:decoration-black/60"
                      >
                        {row.email}
                      </a>
                    </td>

                    <td className="px-6 py-4 font-medium">{row.manager}</td>
                    <td className="px-6 py-4">{row.area}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              aria-label="Editar"
                              className="text-black/60 hover:text-black"
                            >
                              <Pencil className="h-5 w-5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            align="center"
                            sideOffset={8}
                            className="rounded-md border border-black/10 bg-white px-3 py-1 text-xs text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                          >
                            Editar
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              aria-label="Deletar"
                              className="text-red-600/90 hover:text-red-700"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            align="center"
                            sideOffset={8}
                            className="rounded-md border border-black/10 bg-white px-3 py-1 text-xs text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                          >
                            Deletar
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="border-t border-black/10 px-6 py-10 text-center text-black/50"
                    >
                      No results
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="h-16" />
        </div>

        {/* Overlay */}
        {isNewUserOpen && (
          <button
            type="button"
            aria-label="Close new user form"
            onClick={closeNewUser}
            className="absolute inset-0 z-40 cursor-default bg-black/20"
          />
        )}

        {/* Drawer */}
        <aside
          className={[
            "absolute right-0 top-0 z-50 h-full w-full max-w-[980px] bg-white",
            "shadow-[-10px_0_30px_rgba(0,0,0,0.18)]",
            "transition-transform duration-200",
            isNewUserOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          aria-hidden={!isNewUserOpen}
        >
          <div className="flex h-full flex-col">
            {/* Header do drawer */}
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
              <h3 className="text-sm font-medium text-black/70">New user</h3>

              <button
                type="button"
                onClick={closeNewUser}
                aria-label="Close"
                className="text-black/60 hover:text-black"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 px-6 py-6">
              <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70">
                    User email
                  </label>
                  <input
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    className="h-9 w-full rounded-[2px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70">
                    User name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    className="h-9 w-full rounded-[2px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70">
                    User password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => onChange("password", e.target.value)}
                    className="h-9 w-full rounded-[2px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70">
                    User&apos;s manager
                  </label>
                  <input
                    value={form.manager}
                    onChange={(e) => onChange("manager", e.target.value)}
                    className="h-9 w-full rounded-[2px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70">
                    User&apos;s Area
                  </label>
                  <input
                    value={form.area}
                    onChange={(e) => onChange("area", e.target.value)}
                    className="h-9 w-full rounded-[2px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/20"
                  />
                </div>
              </div>
            </div>

            {/* Rodapé do drawer (botões) */}
            <div className="flex items-center justify-end gap-3 border-t border-black/10 px-6 py-4">
              <button
                type="button"
                onClick={closeNewUser}
                className="h-9 rounded-[2px] bg-black/10 px-4 text-sm font-medium text-black/40"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleSave("save")}
                className="h-9 rounded-[2px] bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => handleSave("saveAndCreate")}
                className="h-9 rounded-[2px] bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
              >
                Save and create
              </button>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
