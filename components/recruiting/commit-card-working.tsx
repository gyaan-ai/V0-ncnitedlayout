import { ClientOnly } from "@/lib/client-only"

interface CommitCardWorkingProps {
  athlete: any // Replace 'any' with a more specific type if possible
}

export default function CommitCardWorking({ athlete }: CommitCardWorkingProps) {
  return (
    <ClientOnly>
      <div>
        {/* Your card content here.  Replace this with the actual card content. */}
        <p>Athlete Name: {athlete?.name || "No Name"}</p>
        {/* Example: Display other athlete properties */}
      </div>
    </ClientOnly>
  )
}
