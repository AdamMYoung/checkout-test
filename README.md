# Checkout Test

This application is a demonstration of the requirements provided in the checkout.com front-end developer interview. The application is built using Chakra-UI due to the strong accessibility it provides, Formik and Yup for form creation and validation, and react-vis for data visualization. For error tracking and logging, Sentry has been included as a dependency. Breadcrumbs will be automatically logged prior to an error via the Next.JS integration provided by sentry.

## Structure

The project is broken into distinct areas, as defined below:

-   `components`: Re-usable, composable components. Elements here are expected to be low level and generic where possible.
-   `hooks`: React hooks developed for the application. Generic where possible, and designed to be easily unit-tested.
-   `page-tests`: Due to how Next.js handles the `pages` folder, all tests for static pages can be found here.
-   `pages`: Next.js pages, as defined by the framework's structure.
-   `types`: Type definitions grouped by domain, along with validation schemas for them.
-   `views`: Isolated components, designed with specific functions but not as re-usable or composable like components. These typically handle their own lifecycle, while providing a clear surface for testing.
-   `utils`: Utility functions, grouped by domain.

## To Run

You will need the following environment variables declared:

-   `APPLICATION_URL`: URL of the application, used for the SSR query on `index.tsx`. For development, it will be `localhost:3000`.

The available commands are available:

-   Start Dev Server: `yarn dev`
-   Run Build: `yarn build`
-   Run Tests: `yarn test`
