export default function RaceControls() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/90 px-4 py-3 flex gap-4">
      <button className="flex-1 rounded-md border border-[#EB0029] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#EB0029] hover:bg-[#EB0029] hover:text-black transition">
        Pit Stop
      </button>
      <button className="flex-1 rounded-md border border-[#EB0029] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#EB0029] hover:bg-[#EB0029] hover:text-black transition">
        Safety Car
      </button>
      <button className="flex-1 rounded-md border border-[#EB0029] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#EB0029] hover:bg-[#EB0029] hover:text-black transition">
        Virtual Safety Car
      </button>
    </div>
  );
}
