const request = require("supertest");
const app = require("../app");

describe("Items Routes", () => {
    let itemId;

    test("GET /items should return an empty list initially", async () => {
        const response = await request(app).get("/items");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("POST /items should create a new item", async () => {
        const response = await request(app).post("/items").send({
            itemName: "Broadsword",
            type: "Weapon",
            rarity: "Common",
            cost: "10 gp",
            description: "A sturdy broadsword with a simple crossguard and a leather-wrapped handle.",
            attunement: "None",
            weight: "5 lbs",
            isMagic: "no"
          });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            id: expect.any(String),
        });
        itemId = response.body.id;
    });

    test("GET/items/:id should return the created item", async () => {
        console.log(`item ID: ${itemId}`);
        const response = await request(app).get(`/items/${itemId}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            itemName: "Broadsword",
            type: "Weapon",
            rarity: "Common",
            cost: "10 gp",
            description: "A sturdy broadsword with a simple crossguard and a leather-wrapped handle.",
            attunement: "None",
            weight: "5 lbs",
            isMagic: "no"
        })
    });

    test("PUT/items/:id should update the item", async () => {
        const response = await request(app).put(`/items/${itemId}`).send({
            itemName: "Ice Broadsword",
            type: "Weapon",
            rarity: "Rare",
            cost: "100 gp",
            description: "A sturdy broadsword with a simple ice enchantment.",
            attunement: "None",
            weight: "5 lbs",
            isMagic: "yes"
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "Item updated"
        });
    });

    test("DELETE /items/:id should delete the item", async () => {
        const response = await request(app).delete(`/items/${itemId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "Item deleted"
        });
    });

});

