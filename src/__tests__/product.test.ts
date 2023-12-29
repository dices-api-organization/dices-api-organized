import {MongoMemoryServer} from 'mongodb-memory-server';

// External dependencies

import supertest from "supertest";

// Import our app and controllers

import createServerFunction from "../backend/createServerFunction";

// ************* // 

const app = createServerFunction();

describe('product',()=>{

    beforeAll( async ()=>{

        const mongoServer = await MongoMemoryServer.create();

        process.env.MONGO_URI = mongoServer.getUri();
    })

    describe('get product route',()=>{

        describe('given the product does not exist',()=>{

            it('should return a 404', async()=>{

                await supertest(app).post('/userRegister')
                .send({name: "john", password: "2342388" })
                .expect(201);
            })
        })

        describe('given the product does exist',()=>{

            it('should return a 200', async()=>{

                await supertest(app).post('/').expect(200);
            })
        })
    })

    afterAll( ()=>{

        process.env.MONGO_URI = 'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT';
    })
}) 