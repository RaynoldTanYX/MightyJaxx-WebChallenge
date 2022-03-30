# MightyJaxx Web Challenge

### by Raynold Tan (raynoldtanyx@gmail.com)

## Setup

Requires: `npm`

1. Clone this repository.
2. Add `/MightyJaxx-WebChallenge/admin-dashboard/.env` with the values provided via email.
3. In the terminal, navigate to `/MightyJaxx-WebChallenge/admin-dashboard`.
4. Run `npm install` to install all the required `node_modules`.

## Running the app

1. In the terminal, navigate to `/MightyJaxx-WebChallenge/admin-dashboard`.
2. Run `npm start` to start the app in development mode.
3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Using the app

On first start, the user will not be logged in, and will be redirected to `/login`.

Here, the user can login with the following credentials

> Email: `admin@test.com`
> Password: `12345678`

Authentication is handled using `Firebase Authentication`.

Upon successfully logging in, the user will be redirected to the dashboard.
On the top-left of the screen, the user can logout and return to the login page.

On the dashboard, the user can `Add`, `Edit`, and `Delete` product listings.
These products are persistently stored using `Firestore`.
The optionally uploaded images are stored on `Firebase Storage`

## Potential Improvements

1. Pagination or Lazy Loading
2. Search using backend or services such as ElasticSearch or Algolia
3. Determinate loading progress for image uploads
4. Request optimized image resolution and format using CDNs such as Cloudinary
5. Unit, integration, and end-to-end tests running on CI
