"use client"

export default function CreateDirectoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Directory Setup Instructions</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Required Directory Structure</h2>
          <div className="bg-gray-100 p-4 rounded font-mono text-sm">
            <pre>{`public/
├── images/
    └── logos/
        ├── colleges/
        │   └── unc-chapel-hill.png
        ├── high-schools/
        │   └── cardinal-gibbons.png
        └── clubs/
            └── raw-wrestling.png`}</pre>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Steps to Fix Logo Issue</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Create the directories:</strong>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>
                  <code>public/images/logos/colleges/</code>
                </li>
                <li>
                  <code>public/images/logos/high-schools/</code>
                </li>
                <li>
                  <code>public/images/logos/clubs/</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>Upload your logo files with these exact names:</strong>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>
                  <code>unc-chapel-hill.png</code> (in colleges folder)
                </li>
                <li>
                  <code>cardinal-gibbons.png</code> (in high-schools folder)
                </li>
                <li>
                  <code>raw-wrestling.png</code> (in clubs folder)
                </li>
              </ul>
            </li>
            <li>
              <strong>Test the logos:</strong> Visit <code>/test-logos</code> to verify they load
            </li>
            <li>
              <strong>Check the results:</strong> Visit <code>/recruiting/commits</code> to see the logos on cards
            </li>
          </ol>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm">
            <strong>Note:</strong> Make sure your logo files are PNG format and reasonably sized (under 1MB each) for
            best performance.
          </p>
        </div>
      </div>
    </div>
  )
}
