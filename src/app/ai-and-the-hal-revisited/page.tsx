import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI and the HAL Revisited | Roshan Shah",
  description:
    "Roshan Shah's ECON 89 paper on AI, central planning, institutional constraints, and democratic accountability.",
};

export default function PaperPage() {
  return (
    <main className="relative min-h-screen px-4 py-10 text-zinc-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col">
        <header className="mb-5 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/#projects"
              className="mb-4 inline-flex text-xs font-mono uppercase tracking-[0.2em] text-cyan-300 hover:text-cyan-200"
            >
              Back to projects
            </Link>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-amber-300">
              ECON 89 Term Paper
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
              AI and the HAL Revisited
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Why Computation Was Never the Binding Constraint. A paper on AI,
              central planning, institutional incentives, and democratic accountability.
            </p>
          </div>
          <a
            href="/ai-and-the-hal-revisited.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20"
          >
            Open PDF
          </a>
        </header>

        <section className="min-h-[70vh] flex-1 overflow-hidden rounded-lg border border-white/15 bg-zinc-950 shadow-2xl shadow-black/40">
          <iframe
            src="/ai-and-the-hal-revisited.pdf#view=FitH"
            title="AI and the HAL Revisited PDF viewer"
            className="h-[78vh] min-h-[620px] w-full bg-zinc-950"
          />
        </section>
      </div>
    </main>
  );
}
