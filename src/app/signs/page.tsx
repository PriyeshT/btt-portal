import Link from "next/link"
import { CATEGORIES, getSignsByCategory } from "@/data/signs"
import Image from "next/image"

export default function SignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Signs & Signals</h1>
        <p className="text-sm text-gray-500 mt-1">
          All sign categories from Part B of the Official Handbook
        </p>
      </div>

      <div className="space-y-4">
        {CATEGORIES.map((cat) => {
          const signs = getSignsByCategory(cat.id)
          const preview = signs.slice(0, 4)
          return (
            <Link
              key={cat.id}
              href={`/signs/${cat.id}`}
              className={`block ${cat.bg} ${cat.border} border rounded-xl p-4 hover:opacity-90 transition-opacity`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className={`font-bold ${cat.color}`}>{cat.name}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{cat.rule}</p>
                </div>
                <span className={`text-sm font-bold ${cat.color} bg-white rounded-full px-2 py-0.5 border ${cat.border}`}>
                  {signs.length}
                </span>
              </div>
              {/* Preview thumbnails */}
              <div className="flex gap-2">
                {preview.map((sign) => (
                  <div key={sign.id} className="w-12 h-12 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
                    <Image
                      src={sign.image}
                      alt={sign.name}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>
                ))}
                {signs.length > 4 && (
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                    <span className={`text-xs font-bold ${cat.color}`}>+{signs.length - 4}</span>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
