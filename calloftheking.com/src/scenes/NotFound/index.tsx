import { Link } from 'react-router-dom'

import Button from '~components/Button'

function NotFound() {
  return (
    <div className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center">
      Page not found
      <Link
        to="/"
        className="mt-4"
      >
        <Button>
          Go home
        </Button>
      </Link>
    </div>
  )
}

export default NotFound
