import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LoadingSpinner from "./shared/components/LoadingSpinner";

import { OfflineStatus } from "./common/OfflineStatus";
import Store from "./store/Store";

const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const CreateWorkExperienceCard = React.lazy(() =>
  import("./components/CreateWorkExperienceCard")
);
const EditAllWorkExperiencesCard = React.lazy(() =>
  import("./components/EditAllWorkExperiencesCard")
);
const EditProfileCard = React.lazy(() =>
  import("./components/EditProfileCard")
);
const EditWorkExperienceCard = React.lazy(() =>
  import("./components/EditWorkExperienceCard")
);
const ErrorPage = React.lazy(() => import("./shared/pages/ErrorPage"));

const App = () => {
  const routes = (
    <Switch>
      <Route path={"/"} exact component={ProfilePage} />
      <Route path={"/:profileId/edit/intro"}>
        <ProfilePage>
          <EditProfileCard />
        </ProfilePage>
      </Route>
      <Route path={"/:profileId/edit/workExperiences"}>
        <ProfilePage>
          <EditAllWorkExperiencesCard />
        </ProfilePage>
      </Route>

      {/* create work experience */}
      <Route path={"/:profileId/create"}>
        <ProfilePage>
          <CreateWorkExperienceCard />
        </ProfilePage>
      </Route>

      {/* edit indiv work experience */}
      <Route path={"/:profileId/edit/workExperience/:workExperienceId"}>
        <ProfilePage>
          <EditWorkExperienceCard />
        </ProfilePage>
      </Route>

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
            <OfflineStatus />
            {routes}
          </Suspense>
        </main>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
