import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductCardSkeleton() {
  return (
    <div>
      <div >
            <Skeleton className="h-80" />
            <div className="space-y-4 mt-4">
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>
    </div>
  )
}
