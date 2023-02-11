const request = require("supertest");
import server from '../server'

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  server.close()
  done()
})

describe("Test getting all users", () => {
  jest.setTimeout(30000);
  test("It should respond status code 200", async () => {
    const response = await request(server).get("/user/getAllUsers");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test getting one user", () => {
  
  test("It should respond with the users entire json data based on provided ID", async () => {
    const response = await request(server).get("/user/getUserProfile/63e0738874370282cffaaea6");
    expect(response.body).toStrictEqual({
      "_id": "63e0738874370282cffaaea6",
      "userName": "minod",
      "pass": "password",
      "email": "minod@gmail.com",
      "__v": 0
    });
  });
});

describe("Test user authentication", () => {

  const user = {
    "email" : "mike@gmail.com",
    "pass" : "1234"
  }

  test("It should respond with code 200 success and name of requested user", async () => {
    const response = await request(server).post("/user/authUser").send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body.userName).toBe('mike')
  });
});

describe("Test user authentication for incorrect info", () => {

  const user = {
    "email" : "dave@gmail.com",
    "pass" : "1234"
  }

  test("It should respond with with status 401 due to user not being in database", async () => {
    const response = await request(server).post("/user/authUser").send(user);
    expect(response.statusCode).toBe(401);
  });
});

describe("registering user with incorrect info", () => {

  const user = {
      "userName": "John",
      "pass" : "password",
      "email" : "Johngmail.com"
    }

  test("It should respond with status 500 due to validations", async () => {
    const response = await request(server).post("/user/registerUser").send(user);
    expect(response.statusCode).toBe(500);
  });
});
