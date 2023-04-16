import { Provider as WrapProvider } from 'react-wrap-balancer'

import AuthenticationProvider from '~components/AuthenticationProvider'

import Router from './Router'

function App() {

  return (
    <WrapProvider>
      <AuthenticationProvider>
        <div className="h-full min-h-screen bg-slate-900 text-white">
          <Router />
        </div>
      </AuthenticationProvider>
    </WrapProvider>
  )
}

export default App
