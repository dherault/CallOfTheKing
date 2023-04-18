import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Onboarding from 'scenes/Onboarding'

import AuthenticationBouncer from '~components/AuthenticationBouncer'

import Landing from './scenes/Landing'
import Signup from './scenes/Authentication/Signup'
import Signin from './scenes/Authentication/Signin'
import PasswordReset from './scenes/Authentication/PasswordReset'
import AuthenticationLayout from './scenes/Authentication/AuthenticationLayout'
import NotFound from './scenes/NotFound'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />
        <Route
          path="/authentication"
          element={<AuthenticationLayout><Outlet /></AuthenticationLayout>}
        >
          <Route
            index
            element={(
              <Navigate
                replace
                to="/authentication/signin"
              />
            )}
          />
          <Route
            path="signin"
            element={<Signin />}
          />
          <Route
            path="signup"
            element={<Signup />}
          />
          <Route
            path="password-reset"
            element={<PasswordReset />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
        <Route
          path="/onboarding"
          element={<AuthenticationBouncer><Onboarding /></AuthenticationBouncer>}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
