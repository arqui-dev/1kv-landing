import { useEffect, useState } from 'react'
import { Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { analytics, getDownloadLinks } from '@/lib'

export function Success() {
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    // Get session ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const session = urlParams.get('session_id')
    setSessionId(session)

    // Track successful checkout
    analytics.trackCheckoutCompleted()
  }, [])

  const downloads = getDownloadLinks()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Welcome to 1000 Videos!
        </h1>

        <p className="text-xl text-center text-gray-600 mb-8">
          Your subscription is active. Let's get you started.
        </p>

        {/* Session ID (for debugging) */}
        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-500 font-mono">
              Session ID: {sessionId}
            </p>
          </div>
        )}

        {/* Download Section */}
        <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Download className="w-6 h-6" />
            Download the App
          </h2>
          <p className="text-gray-700 mb-6">
            Choose your operating system to download and install 1kvideos:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <a
              href={downloads.windows}
              className="flex flex-col items-center justify-center bg-white rounded-lg p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary"
            >
              <div className="text-4xl mb-2">🪟</div>
              <div className="font-semibold">Windows</div>
              <div className="text-sm text-gray-500">.exe installer</div>
            </a>

            <a
              href={downloads.macos}
              className="flex flex-col items-center justify-center bg-white rounded-lg p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary"
            >
              <div className="text-4xl mb-2">🍎</div>
              <div className="font-semibold">macOS</div>
              <div className="text-sm text-gray-500">.dmg installer</div>
            </a>

            <a
              href={downloads.linux}
              className="flex flex-col items-center justify-center bg-white rounded-lg p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary"
            >
              <div className="text-4xl mb-2">🐧</div>
              <div className="font-semibold">Linux</div>
              <div className="text-sm text-gray-500">.AppImage</div>
            </a>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <span>Download and install the app for your operating system</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <span>Open the app and log in with your email</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </span>
              <span>Start creating videos 10x faster!</span>
            </li>
          </ol>
        </div>

        {/* Support */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Check your email for a welcome message with setup instructions and tips.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => window.location.href = 'mailto:support@1kvideos.com'}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Email Support
            </Button>
            <Button
              onClick={() => window.location.href = `https://t.me/${import.meta.env.VITE_TELEGRAM_CHANNEL}`}
              className="bg-primary text-white hover:bg-primary-dark"
            >
              Join Community
            </Button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a href="/" className="text-primary hover:underline font-medium">
            ← Back to homepage
          </a>
        </div>
      </div>
    </div>
  )
}
