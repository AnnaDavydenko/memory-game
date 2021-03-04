const env = process.env.NODE_ENV as  "development" | "production";

const ENV_VARIABLES = {
    development: {
        // api: "http://localhost:3001",
         api: "https://memory-game-cards.herokuapp.com",
    },
    production: {
        api: "https://memory-game-cards.herokuapp.com",
    }
};

export const config = { ...ENV_VARIABLES[env] };
