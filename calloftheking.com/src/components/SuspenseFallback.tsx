import CenteredSpinner from '~components/CenteredSpinner'

function SuspenseFallback() {
  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <main className="flex-grow flex flex-col pt-2 pb-4 mx-4">
        <CenteredSpinner />
      </main>
    </div>
  )
}

export default SuspenseFallback
