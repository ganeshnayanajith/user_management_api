'use strict';
const supertest = require("supertest");
const server = supertest.agent("http://localhost:3000/api/usermanagementapi/users");
const path = require("path");
const TokenUtils = require('../lib/TokenUtils');
const qs = require("qs");

describe("users unit tests", () => {
    let token;
    before(async () => {
        token = await TokenUtils.generateTestToken();
        return Promise.resolve();
    });

    /*it("create", (done) => {
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
    }).timeout(50000);*/

    /*it("get", (done) => {
        const userId = "359a1ee0-de8d-11eb-9036-dd313e465e9c";
        server
            .get("/" + userId)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if (!err) {
                    console.log(res.body);
                }
                done(err);
            });
    }).timeout(50000);*/

    /*it("getAll", (done) => {
        const query = qs.stringify({
            skip: 1,
            limit: 1
        });
        server
            .get("/?" + query)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if (!err) {
                    console.log(res.body);
                }
                done(err);
            });
    }).timeout(50000);*/

    /*it("update", (done) => {

        const userId = "359a1ee0-de8d-11eb-9036-dd313e465e9c";

        const payload = {
            firstName: "test updated",
            lastName: "user updated",
            password: "password_updated"
        };

        server
            .put("/" + userId)
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
            .expect(200)
            .end((err, res) => {
                if (!err) {
                    console.log(res.body);
                }
                done(err);
            });
    }).timeout(50000);*/

    /*it("delete", (done) => {

        const userId = "359a1ee0-de8d-11eb-9036-dd313e465e9c";

        server
            .delete("/" + userId)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if (!err) {
                    console.log(res.body);
                }
                done(err);
            });
    }).timeout(50000);*/

});
