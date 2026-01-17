import Link from "next/link"

import { Button } from "@/components/ui/button"

export function WhatLLMBanner() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-sm leading-snug text-foreground">
          <span className="font-semibold">Heads up:</span> this site hasn’t been
          updated in a while. For{" "}
          <span className="font-semibold">
            all the info, visualizations, benchmarks, and comparisons
          </span>
          , go to{" "}
          <Link
            href="https://whatllm.org/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-4 hover:opacity-90"
          >
            WhatLLM.org
          </Link>
          .
        </p>

        <Button asChild className="shrink-0">
          <Link href="https://whatllm.org/" target="_blank" rel="noreferrer">
            Go to WhatLLM.org
          </Link>
        </Button>
      </div>
    </div>
  )
}

