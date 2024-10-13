'use client'

import dynamic from 'next/dynamic'

const AIModelShowdown = dynamic(() => import('./ai-model-showdown'), { ssr: false })

export default function ClientAIModelShowdown() {
  return <AIModelShowdown />
}