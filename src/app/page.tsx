import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EcoInsights Hub',
  description: 'A subscription-based platform providing personalized climate tech insights and actionable advice for small businesses aiming to improve their environmental impact.',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">EcoInsights Hub</h1>
      <p className="mt-4 text-lg">A subscription-based platform providing personalized climate tech insights and actionable advice for small businesses aiming to improve their environmental impact.</p>
    </main>
  )
}
