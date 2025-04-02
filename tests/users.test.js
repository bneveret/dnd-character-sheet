const request = require("supertest");
const app = require("../app");

describe("User Routes", () => {
    let userId;

    test("GET /users should return an empty list initially", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("POST /users should create a new user", async () => {
        const response = await request(app).post("/users").send({
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@example.com",
            favoriteColor: "Green",
            birthday: "1990-01-01",
            timeAvailable: "10:00 AM - 6:00 PM",
            password: "newpassword123",
            phoneNumber: "987-654-3210"
        });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            id: expect.any(String),
        });
        userId = response.body.id;
    });

    test("GET/users/:id should return the created user", async () => {
        console.log(`User ID: ${userId}`);
        const response = await request(app).get(`/users/${userId}`);
        expect(response.status).toBe(200);
        // Password is taken out because it has been hashed
        expect(response.body).toMatchObject({
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@example.com",
            favoriteColor: "Green",
            birthday: "1990-01-01",
            timeAvailable: "10:00 AM - 6:00 PM",
            phoneNumber: "987-654-3210"
        })
    });

    test("PUT/users/:id should update the user", async () => {
        const response = await request(app).put(`/users/${userId}`).send({
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            favoriteColor: "Blue",
            birthday: "1990-01-01",
            timeAvailable: "10:00 AM - 6:00 PM",
            password: "newpassword123",
            phoneNumber: "987-654-3210"
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "User updated"
        });
    });

    test("DELETE /users/:id should delete the user", async () => {
        const response = await request(app).delete(`/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "User deleted"
        });
    });

});

