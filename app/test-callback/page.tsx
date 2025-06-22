export default function TestCallbackPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-500">Callback Route Test</h1>
      <p>If you see this, routing is working!</p>
      <a href="/auth/callback" className="text-blue-500 underline">
        Test Auth Callback
      </a>
    </div>
  )
}
