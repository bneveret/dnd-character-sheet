const request = require("supertest");
const app = require("../app");

describe("Character Routes", () => {
    let characterId;

    test("GET /characters should return an empty list initially", async () => {
        const response = await request(app).get("/characters");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("POST /characters should create a new character", async () => {
        const response = await request(app).post("/characters").send({
            name: "Joe Chill",
            species: "Orc",
            class_type: "Warrior",
            abilities: "Strength",
            stats: "Strength 10",
            level: "1",
            items: "None"
          });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            id: expect.any(String),
        });
        characterId = response.body.id;
    });

    test("GET/characters/:id should return the created character", async () => {
        console.log(`character ID: ${characterId}`);
        const response = await request(app).get(`/characters/${characterId}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            name: "Joe Chill",
            species: "Orc",
            class_type: "Warrior",
            abilities: "Strength",
            stats: "Strength 10",
            level: "1",
            items: "None"
        })
    });

    test("PUT/characters/:id should update the character", async () => {
        const response = await request(app).put(`/characters/${characterId}`).send({
            name: "Joe Chill",
            species: "Human",
            class_type: "Warrior",
            abilities: "Strength",
            stats: "Strength 9",
            level: "0",
            items: "None"
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "Character updated"
        });
    });

    test("DELETE /characters/:id should delete the character", async () => {
        const response = await request(app).delete(`/characters/${characterId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "Character deleted"
        });
    });

});

