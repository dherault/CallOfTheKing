import Spinner from '~components/Spinner'

function CenteredSpinner() {
  return (
    <div
      role="status"
      className="h-screen flex justify-center items-center"
    >
      <Spinner className="w-8 h-8" />
    </div>
  )
}

export default CenteredSpinner
