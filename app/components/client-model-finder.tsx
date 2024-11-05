'use client'

import dynamic from 'next/dynamic'

const ModelFinder = dynamic(() => import('@/components/model-finder'), { ssr: false })

export default function ClientModelFinder() {
  return <ModelFinder />
}