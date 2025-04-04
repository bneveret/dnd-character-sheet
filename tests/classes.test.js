const request = require("supertest");
const app = require("../app");

describe("Class Routes", () => {
    let classId;

    test("GET /classes should return an empty list initially", async () => {
        const response = await request(app).get("/classes");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("POST /classes should create a new class", async () => {
        const response = await request(app).post("/classes").send({
            className: "Wizard",
            hitDie: "1d8",
            primaryAttribute: "Intelligence",
            savingThrows: "Intelligence, Wisdom",
            skills: "Arcana, History, Insight, Investigation",
            preparedSpells: "fireball, magic missile, shield",
            weapons: "dagger, quarterstaff",
            armor: "light armor",
            startEquipment: "spellbook, component pouch",
            bonusProficiency: "Arcana, History",
          });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            id: expect.any(String),
        });
        classId = response.body.id;
    });

    test("GET/classes/:id should return the created class", async () => {
        console.log(`class ID: ${classId}`);
        const response = await request(app).get(`/classes/${classId}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            className: "Wizard",
            hitDie: "1d8",
            primaryAttribute: "Intelligence",
            savingThrows: "Intelligence, Wisdom",
            skills: "Arcana, History, Insight, Investigation",
            preparedSpells: "fireball, magic missile, shield",
            weapons: "dagger, quarterstaff",
            armor: "light armor",
            startEquipment: "spellbook, component pouch",
            bonusProficiency: "Arcana, History",
        })
    });

    test("PUT/classes/:id should update the class", async () => {
        const response = await request(app).put(`/classes/${classId}`).send({
            className: "Wizard",
            hitDie: "1d8",
            primaryAttribute: "Intelligence",
            savingThrows: "Intelligence, Wisdom",
            skills: "Arcana, History, Insight, Investigation",
            preparedSpells: "magic missile, shield",
            weapons: "dagger, quarterstaff",
            armor: "light armor",
            startEquipment: "spellbook, component pouch",
            bonusProficiency: "Arcana, History",
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "Class updated"
        });
    });

    test("DELETE /classes/:id should delete the class", async () => {
        const response = await request(app).delete(`/classes/${classId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "Class deleted"
        });
    });

});

