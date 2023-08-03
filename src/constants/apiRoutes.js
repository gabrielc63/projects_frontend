const prod = {
  url: {
    BASE_URL: "https://my-heroku-app.herokuapp.com/api/v1/",
  },
};

const dev = {
  url: {
    BASE_URL: "http://localhost:4000",
    BOARDS_INDEX_URL: "/api/v1/boards",
    CREATE_BOARD_URL: "/api/v1/boards/create",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
