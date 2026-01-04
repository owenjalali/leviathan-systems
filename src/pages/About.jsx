import { useEffect, useState } from 'react'

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="bg-[#030306] min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.3) 0%, transparent 60%)' }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.3) 0%, transparent 60%)' }}
      />

      <div className="text-center relative z-10 px-6">
        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Coming Soon
        </h1>
        <p className={`text-xl text-[#6b7280] transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          We're working on something great.
        </p>
      </div>
    </div>
  )
}
