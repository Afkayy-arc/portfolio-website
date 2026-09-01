"use client";

import { useState } from "react";
import { personalInfo } from "@/constants/data";

// Two audiences, one page: the short bio for clients skimming, the long one for recruiters.
export default function BioToggle() {
  const [long, setLong] = useState(false);
  return (
    <div>
      <div role="tablist" aria-label="Bio length" className="mb-5 inline-flex rounded-[var(--radius-btn)] border border-hairline bg-surface-1 p-0.5">
        {[false, true].map((v) => (
          <button key={String(v)} role="tab" aria-selected={long === v} onClick={() => setLong(v)} className={`rounded-[var(--radius-btn)] px-3.5 py-1.5 text-[13px] transition-colors ${long === v ? "bg-surface-2 text-ink" : "text-ink-subtle hover:text-ink"}`}>
            {v ? "Long" : "Short"}
          </button>
        ))}
      </div>
      <p className="max-w-[60ch] text-lg leading-relaxed text-ink-muted">{long ? personalInfo.bioLong : personalInfo.bioShort}</p>
    </div>
  );
}
