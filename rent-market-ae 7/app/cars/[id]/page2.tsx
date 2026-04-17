'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCarById } from '@/lib/data'
import BottomNav from '@/components/layout/BottomNav'

const categoryConfig: Record<string, { chip: string }> = {
  Economy: { chip: 'bg-emerald-50 text-emerald-700' },
  SUV:     { chip: 'bg-blue-50 text-blue-700'       },
  Luxury:  { chip: 'bg-violet-50 text-violet-700'   },
  Sports:  { chip: 'bg-amber-50 text-amber-700'     },
  Exotic:  { chip: 'bg-rose-50 text-rose-700'       },
}

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = getCarById(params.id)
  if (!car) notFound()

  const cfg = categoryConfig[car.category] || categoryConfig.Sports
  const waText = encodeURIComponent(
    `Hi, I'm interested in renting the ${car.year} ${car.brand} ${car.model}. Daily rate: AED ${car.dailyPrice}. Please share availability.`
  )

  return (
    <div className="min-h-screen pb-24 bg-stone-50">

      {/* Hero Image */}
      <div className="relative h-64 bg-stone-200">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </Link>

        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
          {car.isHotDeal && (
            <span className="bg-rose-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full">HOT DEAL</span>
          )}
          {car.depositType === 'no-deposit' && (
            <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full">NO DEPOSIT</span>
          )}
          {!car.availableNow && (
            <span className="bg-stone-800 text-white text-[9px] font-black px-2.5 py-1 rounded-full">UNAVAILABLE</span>
          )}
        </div>

        {/* Provider + Rating overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-white/70 text-[11px] font-medium">{car.providerName}</p>
            <h1 className="text-white font-black text-2xl leading-tight">
              {car.brand} {car.model}
            </h1>
            <p className="text-white/60 text-xs mt-0.5">{car.year} · {car.category}</p>
          </div>
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-white text-[11px] font-bold">{car.rating.toFixed(1)}</span>
            <span className="text-white/60 text-[10px]">({car.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Daily', price: car.dailyPrice },
            { label: 'Weekly', price: car.weeklyPrice },
            { label: 'Monthly', price: car.monthlyPrice },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-[10px] text-stone-400 font-medium mb-0.5">{item.label}</p>
              <p className="font-black text-stone-900 text-[15px] leading-none">
                AED {item.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${cfg.chip}`}>{car.category}</span>
          {car.depositType === 'no-deposit' ? (
            <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              No Deposit Required
            </span>
          ) : (
            <span className="text-stone-400 text-xs font-medium">
              Deposit: AED {car.depositAmount?.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Highlights */}
      {car.highlights.length > 0 && (
        <div className="mx-4 mt-3 bg-amber-50 rounded-2xl border border-amber-100 p-4">
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-3">Highlights</p>
          <div className="flex flex-col gap-2">
            {car.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-xs font-semibold text-stone-800">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mx-4 mt-3 bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">About</p>
        <p className="text-sm text-stone-600 leading-relaxed">{car.shortDescription}</p>
      </div>

      {/* Specs */}
      <div className="mx-4 mt-3 bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Specifications</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Transmission', value: car.transmission },
            { label: 'Fuel Type', value: car.fuelType },
            { label: 'Seats', value: `${car.seats} seats` },
            { label: 'Year', value: String(car.year) },
          ].map((spec) => (
            <div key={spec.label} className="bg-stone-50 rounded-xl p-3">
              <p className="text-[10px] text-stone-400 font-medium">{spec.label}</p>
              <p className="text-sm font-bold text-stone-800 mt-0.5">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      {car.features.length > 0 && (
        <div className="mx-4 mt-3 bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Features</p>
          <div className="flex flex-wrap gap-2">
            {car.features.map((f) => (
              <span key={f} className="bg-stone-50 border border-stone-200 text-stone-700 text-[11px] font-semibold px-3 py-1.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA Bar */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[480px] mx-auto px-4 py-3 bg-white/97 backdrop-blur-md border-t border-stone-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-40">
        <div className="flex gap-3">
          <Link
            href="/"
            className="flex-shrink-0 w-11 h-11 rounded-2xl bg-stone-100 flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </Link>
          <a
            href={`https://wa.me/971501234567?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 rounded-2xl text-sm shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book on WhatsApp
          </a>
          <a
            href={`tel:+971501234567`}
            className="flex-shrink-0 w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .21h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.06-1.06a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
