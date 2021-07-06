'use strict';
const supertest = require("supertest");
const server = supertest.agent("http://localhost:3000/api/usermanagementapi/tokens");

describe("tokens unit tests", () => {

    before(async () => {
    });

    it("generate a token", (done) => {
        const payload = {
            email: "testuser@test.com",
            password: "password"
        };
        server
            .post("/")
            .send(payload)
            .expect(200)
            .end((err, res) => {
                if (!err) {
                    console.log(res.body);
                }
                done(err);
            });
    }).timeout(50000);

});
