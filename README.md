
# Pokémon Pokedex

This project is a small application to display a list of Pokémon, built with **React**, **TypeScript**, **Apollo Client**, and **JSS** for styling. The application integrates with a **GraphQL API** to fetch Pokémon data and display it in an interactive and user-friendly interface.

## Features

1. **Pokémon List**

   * Displays a list of Pokémon with their name, number, types, and image.
   * Includes a hover effect on each Pokémon item for better interactivity.

2. **Search Functionality**

   * A search box that allows users to filter the Pokémon list based on their search input.
   * The search is case-insensitive and works only on the client side.

3. **Pokémon Details Dialog**

   * Users can click on any Pokémon to view more detailed information in a modal/dialog.
   * The dialog is route-dependent and uses **React Router** for navigation.
   * The modal includes additional information such as weight, height, classification, types, resistances, weaknesses, and stats like max CP and max HP.

## Technologies Used

* **React**: A JavaScript library for building user interfaces.
* **TypeScript**: A typed superset of JavaScript for better development experience and type safety.
* **Apollo Client**: A GraphQL client for interacting with the Pokémon API.
* **JSS**: A CSS-in-JS library used for styling.
* **React Router**: For routing and handling navigation.
* **Material UI**: For creating the modal/dialog UI component.

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/imvikramjagtap/pokedex
cd pokedex-app
```

### 2. Install Dependencies

Make sure you have **Node.js** and **npm** or **yarn** installed. Then, install the required dependencies:
Node: v16
```bash
nvm use 16

npm install
# or
yarn install
```

### 3. Running the Application

To run the application locally:

```bash
npm start
# or
yarn start
```

This will start the app on `http://localhost:3000` by default.

### 4. Accessing the API

The application uses the Pokémon GraphQL API to fetch the data. The Apollo Client is already set up to communicate with the API from the `src/app/client.ts` file.

## Structure of the Application

* `src/`: Contains all source files for the project.

  * `components/`: All presentational components like `PokemonList` and `PokemonItem`.
  * `hooks/`: Custom hooks like `useGetPokemons.ts` for fetching Pokémon data.
  * `app/`: Contains the Apollo Client configuration (`client.ts`) and main app setup.
  * `pages/`: Contains the list page and any other pages or routes.
  * `styles/`: Contains JSS styling solutions.

## How to Use

* The **Pokémon List** page displays a list of Pokémon, and users can scroll through them.
* **Search Bar**: You can search for Pokémon by name. The list filters in real-time as you type.
* **Details Modal**: Clicking on a Pokémon item will open a modal showing detailed information about that Pokémon.

