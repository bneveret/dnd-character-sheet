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
            proficiency: "Daggers, darts, slings, quarterstaffs, light crossbows",
            hitpointsAtFirstLevel: "8",
            spellCastingAttribute: "Intelligence",
            spellsKnown: "fireball, magic missile, shield",
            cantripsKnown: "light, mage hand, prestidigitation",
            spellSlotsPerLevel: "1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10",
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
            proficiency: "Daggers, darts, slings, quarterstaffs, light crossbows",
            hitpointsAtFirstLevel: "8",
            spellCastingAttribute: "Intelligence",
            spellsKnown: "fireball, magic missile, shield",
            cantripsKnown: "light, mage hand, prestidigitation",
            spellSlotsPerLevel: "1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10",
        })
    });

    test("PUT/classes/:id should update the class", async () => {
        const response = await request(app).put(`/classes/${classId}`).send({
            className: "Mage",
            hitDie: "1d8",
            primaryAttribute: "Intelligence",
            savingThrows: "Intelligence, Wisdom",
            proficiency: "Daggers, darts, slings, quarterstaffs, light crossbows",
            hitpointsAtFirstLevel: "8",
            spellCastingAttribute: "Intelligence",
            spellsKnown: "fireball, magic missile, shield",
            cantripsKnown: "light, mage hand, prestidigitation",
            spellSlotsPerLevel: "1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10",
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

