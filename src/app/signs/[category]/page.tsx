import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getCategory, getSignsByCategory, CATEGORIES } from "@/data/signs"

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.id }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) notFound()

  const signs = getSignsByCategory(category)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Link href="/signs" className="text-sm text-red-700 font-medium hover:underline">
          ← Signs
        </Link>
        <h1 className="text-xl font-bold text-gray-900 mt-2">{cat.name}</h1>
        <div className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${cat.bg} ${cat.color} ${cat.border} border`}>
          {cat.subtitle}
        </div>
        <p className="text-sm text-gray-600 mt-2">{cat.rule}</p>
      </div>

      {/* Signs grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {signs.map((sign) => (
          <div
            key={sign.id}
            className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col items-center gap-2"
          >
            <div className="w-24 h-24 flex items-center justify-center">
              <Image
                src={sign.image}
                alt={sign.name}
                width={96}
                height={96}
                className="object-contain max-w-full max-h-full"
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-800 leading-tight">{sign.name}</p>
              <p className="text-xs text-gray-500 mt-1 leading-tight">{sign.description}</p>
              {sign.note && (
                <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1 mt-1 leading-tight">
                  ⚠ {sign.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
