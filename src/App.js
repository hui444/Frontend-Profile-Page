import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import EditProfileCard from "./components/EditProfileCard";

import LoadingSpinner from "./shared/components/LoadingSpinner";
import ErrorPage from "./shared/pages/ErrorPage";

import Store from "./store/Store";

const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
// const EditProfileModal = React.lazy(() =>
//   import("./components/EditProfileModal")
// );
// const EditExperienceModal = React.lazy(() =>
//   import("./components/EditExperienceModal")
// );
// const CreateWorkExperience = React.lazy(() =>
//   import("./components/CreateWorkExperience")
// );
// const EditIndivWorkExperienceModal = React.lazy(() =>
//   import("./components/EditIndivWorkExperienceModal")
// );

const App = () => {
  const routes = (
    <Switch>
      <Route path={"/"} exact component={ProfilePage} />
      <Route path={"/:profileId/edit/intro"}>
        <ProfilePage>
          <EditProfileCard />
        </ProfilePage>
      </Route>
      {/*<Route path={"/:profileId/edit/workExperiences"}>
        <ProfilePage>
          <EditExperienceModal />
        </ProfilePage>
      </Route> */}

      {/* create work experience */}
      {/* <Route path={"/:profileId/create"}>
        <ProfilePage>
          <CreateWorkExperience />
        </ProfilePage>
      </Route> */}

      {/* edit indiv work experience */}
      {/* <Route path={"/:profileId/edit/workExperience/:workExperienceId"}>
        <ProfilePage>
          <EditIndivWorkExperienceModal />
        </ProfilePage>
      </Route> */}

      <Route>
        <ErrorPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner asOverlay />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
