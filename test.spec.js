const Medicine = require('./schemas/medicine');
const app = require("./app");
const newProduct = require('./new_medicine.json');
const request = require('supertest');
const { expect } = require('@jest/globals');

it ("POST /api/medicine", async () => {
    const response = await request(app).post('/api/medicine').send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success");
    expect(response.body.medicine.name).toBe(newProduct.name);
    expect(response.body.medicine.description).toBe(newProduct.description);
    expect(response.body.medicine.price).toBe(newProduct.price);
})

it ("should return 500 in POST with only name", async () => {
    const response = await request(app).post('/api/medicine').send({name: "wrongInput"});

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("fail");
})

it ("GET /api/medicine", async () => {
    const response = await request(app).get('/api/medicine');

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success");
    expect(response.body.medicines[0].name).toBe("Vitamin A");
    expect(response.body.medicines[0].description).toBe("AAAAAA");
    expect(response.body.medicines[0].price).toBe("3000");
});

it ("GET /api/medicine/60eba3bcc1884a0718353bff", async () => {
    const response = await request(app).get('/api/medicine/60eba3bcc1884a0718353bff');

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success");
    expect(response.body.medicine.name).toBe("Vitamin A");
    expect(response.body.medicine.description).toBe("AAAAAA");
    expect(response.body.medicine.price).toBe("3000");
});

it ("PUT /api/medicine/60eba41cc6fcc308467516bb", async () => {
    const response = await request(app).get('/api/medicine/60eba41cc6fcc308467516bb').send({
        name: "Vitamin D",
        description: "DDDDD",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success");
});

it ("should return 500 in PUT with wrong id", async () => {
    // wrong id
    const response = await request(app).get('/api/medicine/60eba41cc6fcc308sd467516bb').send({
        name: "Vitamin D",
        description: "DDDDD",
    });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("fail");
});

it ("PUT /api/medicine/60ebba91f1541443ee40e1d5", async () => {
    const response = await request(app).get('/api/medicine/60ebba91f1541443ee40e1d5');

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success");
});

it ("PUT /api/medicine/60ebba91f1541443ee40esadf1d5", async () => {
    const response = await request(app).get('/api/medicine/60ebba91f1541443ee40esadf1d5');

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("fail");
});