# Checkout Test

This application is a demonstration of the requirements provided in the checkout.com front-end developer interview. The application is built using Chakra-UI due to the strong accessibility it provides, Formik and Yup for form creation and validation, and react-vis for data visualization.

For error tracking and logging, Sentry has been included as a dependency. Breadcrumbs will be automatically logged prior to an error via the Next.JS integration provided by Sentry. Static code analysis in a GitHub action has also been added to align with best practices around security.

Additionally, it would have been nice to add i18n with [react-i18next](https://react.i18next.com/), as well as potentially move the custom star components into a chakra-ui theme definition, sadly I didn't have the time alongside my current timetable.

## Structure

The project is broken into distinct folders, as defined below:

-   `components`: Re-usable, composable components. Elements here are expected to be low level and generic where possible.
-   `hooks`: React hooks developed for the application. Generic where possible, and designed to be easily unit-tested.
-   `page-tests`: Due to how Next.js handles the `pages` folder, all tests for static pages can be found here.
-   `pages`: Next.js pages, as defined by the framework's structure.
-   `types`: Type definitions grouped by domain, along with validation schemas for them.
-   `views`: Isolated components, designed with specific functions but not as re-usable or composable like components. These typically handle their own lifecycle, while providing a clear area for testing.
-   `utils`: Utility functions, grouped by domain.
-   `.github/workflows`: Pipeline YML files built for GitHub actions.

## To Run

You will need the following environment variables declared:

-   `APPLICATION_URL`: URL of the application, used for the SSR query on `index.tsx`. For development, it will be `localhost:3000`.
-   `SENTRY_DSN`: DSN to use for pushing events to Sentry.
-   `SENTRY_AUTH_TOKEN`: Authentication token provided by Sentry.
-   `SENTRY_ORG`: Organization the Sentry project belongs to.
-   `SENTRY_PROJECT`: Name of the project in Sentry.

First, run `yarn install` to pull down the required packages. Then, the available commands are available:

-   Start Dev Server: `yarn dev`
-   Run Build: `yarn build`
-   Run Tests: `yarn test`
