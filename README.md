# Rick and Morty Character Explorer

This project allows users to explore characters from the Rick and Morty series using data fetched from the Rick and Morty GraphQL API. Users can paginate through the list of characters and filter the list by character names.

## Features

- Display a list of Rick and Morty characters.
- Paginate through the list of characters.
- Search characters by their names.
- View details about a character by hovering over their card.

## Technologies Used

- React (v18.2.0)
- Redux & React-Redux
- Redux Toolkit
- Apollo Client (for GraphQL)
- MUI (Material-UI)
- Emotion (for styled components)

## Development

This project uses Vite as its build tool. The following npm scripts are available:

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run preview`: Preview the production build
- `npm run test`: Run tests using Vite's testing utility
- `npm run format`: Format the code using Prettier
- `npm run lint`: Lint the project using ESLint
- `npm run type-check`: Check types with TypeScript

## Installation

1. Clone the repository:

```
git clone https://github.com/aldrin-lim/rick-and-morty.git
cd rick-and-morty
```

2. Install the dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

Visit `http://localhost:5173/rick-and-morty/` in your browser to view the app.

## Structure

The project has a clear folder structure:

- **hooks**: Contains custom hooks, such as `useCharacters`.
- **screens**: Houses the primary display components/screens like `Characters`.
- **store**: Contains Redux slices and the Redux store configuration.
- **types**: Type definitions, mainly for the character data fetched.
- **__tests__**: Contains test utilities and test cases.

