'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      // Insert into Supabase
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: email.toLowerCase().trim(),
            name: name.trim() || null,
            source: 'website',
            subscribed_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          setStatus('error')
          setMessage('This email is already subscribed!')
        } else {
          throw error
        }
      } else {
        setStatus('success')
        setMessage('Successfully subscribed! Check your email for confirmation.')
        setEmail('')
        setName('')

        // Optional: Trigger welcome email via Edge Function
        // await fetch('/api/send-welcome-email', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, name })
        // })
      }
    } catch (err) {
      console.error('Newsletter signup error:', err)
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-black/10 p-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-8 h-8 text-black" strokeWidth={1.5} />
        <div>
          <h3 className="text-2xl font-bold text-black">Stay Updated</h3>
          <p className="text-gray-600 text-sm">Get new automation ideas delivered to your inbox</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">You're subscribed!</p>
            <p className="text-sm text-green-700 mt-1">{message}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name (optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-black"
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-black"
              disabled={status === 'loading'}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            We'll send you new automation ideas weekly. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  )
}
