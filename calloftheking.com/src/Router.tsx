import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

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
            element={<Navigate to="/authentication/signin" />}
          />
          <Route
            path="sigin"
            element={<Signin />}
          />
          <Route
            path="password-reset"
            element={<PasswordReset />}
          />
          <Route
            path="signup"
            element={<Signup />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
