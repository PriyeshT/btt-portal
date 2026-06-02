import { notFound } from "next/navigation"
import { LEARNING_PATHS } from "@/data/paths"
import PathPageClient from "./PathPageClient"

export function generateStaticParams() {
  return LEARNING_PATHS.map(p => ({ pathId: p.id }))
}

export default async function LearnPathPage({
  params,
}: {
  params: Promise<{ pathId: string }>
}) {
  const { pathId } = await params
  if (!LEARNING_PATHS.find(p => p.id === pathId)) notFound()

  return <PathPageClient pathId={pathId} />
}
