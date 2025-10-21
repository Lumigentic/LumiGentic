'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[600px] md:h-[700px] bg-black/[0.96] relative overflow-hidden border-none">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
            High-impact automation.
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-lg mb-8">
            Solutions that cut wasted time, reduce costs, and scale your business with intelligent AI-powered systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-black font-semibold rounded-sm hover:bg-gray-200 transition-colors text-center"
            >
              Start Your Journey
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors text-center"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Right content - 3D Scene */}
        <div className="flex-1 relative min-h-[300px] md:min-h-0">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
