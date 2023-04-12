import { Provider as WrapProvider } from 'react-wrap-balancer'

import AuthenticationProvider from '~components/AuthenticationProvider'

import Router from './Router'

function App() {

  return (
    <WrapProvider>
      <AuthenticationProvider>
        <div className="bg-slate-800 h-full min-h-screen text-white">
          <Router />
        </div>
      </AuthenticationProvider>
    </WrapProvider>
  )
}

export default App
