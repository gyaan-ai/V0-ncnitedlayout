"use client"

import { CommitCard, type CommitCardProps } from "./commit-card-simple"

interface CommitCardGridProps {
  commits: CommitCardProps[]
  title?: string
  description?: string
}

export function CommitCardGrid({ commits, title, description }: CommitCardGridProps) {
  return (
    <div className="w-full">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {commits.map((commit) => (
          <CommitCard key={commit.id} {...commit} />
        ))}
      </div>
    </div>
  )
}
