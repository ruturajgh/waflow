
import { cn } from "@/lib/utils"

type NodeFrameProps = {
  selected?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function NodeFrame({
  selected,
  children,
  onClick,
}: NodeFrameProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-md border border-transparent p-2 transition",
        "hover:bg-muted/50",
        selected && "ring-2 ring-primary"
      )}
    >
      {children}
    </div>
  )
}