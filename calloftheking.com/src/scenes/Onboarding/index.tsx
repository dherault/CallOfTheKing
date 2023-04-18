import { useContext } from 'react'
import { Link } from 'react-router-dom'

import Button from '~components/Button'

function Onboarding() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link to="/~">
        <Button>
          End onboarding
        </Button>
      </Link>
    </div>
  )
}

export default Onboarding
