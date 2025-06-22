export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-500">TEST PAGE WORKING</h1>
      <p>If you can see this, Next.js routing is working.</p>
      <p>Current time: {new Date().toISOString()}</p>
    </div>
  )
}
