import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import AuthenticationBouncer from '~components/AuthenticationBouncer'
import AdministratorBouncer from '~components/AdministratorBouncer'

import Home from '~scenes/Home'
import Onboarding from '~scenes/Onboarding'
import Landing from '~scenes/Landing'
import Signup from '~scenes/Authentication/Signup'
import Signin from '~scenes/Authentication/Signin'
import PasswordReset from '~scenes/Authentication/PasswordReset'
import AuthenticationLayout from '~scenes/Authentication/AuthenticationLayout'
import NotFound from '~scenes/NotFound'
import AdministratorDashboard from '~scenes/AdministratorDashboard'

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
          path="/~"
          element={<Outlet />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path=":userId"
            element={<Home />}
          />
        </Route>
        <Route
          path="/admin"
          element={<AdministratorBouncer><AdministratorDashboard /></AdministratorBouncer>}
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
