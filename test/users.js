'use strict';
const supertest = require("supertest");
const server = supertest.agent("http://localhost:3000/api/usermanagementapi/users");
const path = require("path");
const TokenUtils = require('../lib/TokenUtils');

describe("users unit tests", () => {
    let token;
    before(async () => {
        token = await TokenUtils.generateTestToken();
        return Promise.resolve();
    });

    it("create", (done) => {
        const payload = {
            firstName: "test",
            lastName: "user",
            email: "testuser@test.com",
            password: "password",
            permissionLevel: "user"
        };
        server
            .post("/")
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
            .expect(201)
            .end((err, res) => {
                if (!err) {
                    console.log(res.body);
                }
                done(err);
            });
    }).timeout(50000);

});
