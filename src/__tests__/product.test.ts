// External dependencies
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from "supertest";
import { UserModel } from '../dices/infrastructure/mongoDB/mongoModel/UserSchema';
// Import our app and controllers

import createServerFunction from "../backend/createServerFunction";



// ************* // 

const app = createServerFunction();

describe('product',()=>{

    beforeAll(async ()=>{
    
        const mongoServer = MongoMemoryServer.create();


         const testUri = mongoServer.then((data)=>{
            
    
            const mongoTestConnection = mongoose
      .connect(data.getUri())
      .then(() => console.log(`test database connected at ${data.getUri()}!`));
        })
    


    })

    afterAll(async()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

// MAIN TESTS

// If login route is specified, but no user is registered   

            it('should return a 404 if we specify login route, but have no user registered', async()=>{

                await supertest(app).post('/userLogin')
                .send({name: "testName", password: "testPassword" })
                .expect(404);
            })

            // If we register a user, we should get 201  

            it('should return a 201 if we try to register the user', async()=>{

                await supertest(app).post('/userRegister')
                .send({name: "testName", password: "testPassword" })
                .expect(201)})

                // If we register the same username, it should fail
                it('should return a 401 if we try to register the same user', async()=>{

                    await supertest(app).post('/userRegister')
                    .send({name: "testName", password: "testPassword" })
                    .expect(401)})


                // If we register a different name, but the same password, it should fail

                it('should return a 401 if we try to register the same pass', async()=>{

                    await supertest(app).post('/userRegister')
                    .send({name: "testName2", password: "testPassword" })
                    .expect(401)})

                // If we register an Anonim twice, it should succeed

                it('should return a 201 if we try to register two Anonim users, despite their names being the same', async()=>{

                    await supertest(app).post('/userRegister')
                    .send({name: "Anonim", password: "anonPass1" })
                    .expect(201)
                
                    await supertest(app).post('/userRegister')
                    .send({name: "Anonim", password: "anonPass2" })
                    .expect(201)
                })



                // If we register an Anonim with the same password, it should fail

                it('should return a 401 if we try to register Anonim with existant pwd', async()=>{

                    await supertest(app).post('/userRegister')
                    .send({name: "Anonim", password: "anonPass1" })
                    .expect(401)
                
                    
                })





                // Now login with a user registered

                it('should return a 200 if we login with true user', async()=>{

                    await supertest(app).post('/userLogin')
                    .send({name: "testName", password: "testPassword" })
                    .expect(200);
                })


                // The user can play a game

                it('should return a 200 if we play a game', async()=>{
                        // But first we need our user's ID

                        const ourData = await UserModel.findOne({ name: 'testName' });

                        


                    await supertest(app).post('/play/throw')
                    .send({id:ourData?.toJSON()._id})
                    .expect(200);
                
                })

                // We can see who the max winner is


                it('should return a 200 if we search for the max winner', async()=>{
                    


                await supertest(app).get('/play/max')
                .expect(200);
            
            })

            // And search for the min loser

            it('should return a 200 if we search for the min loser', async()=>{
                


           await supertest(app).get('/play/min')
           .expect(200);
       
       })

       // We can get a list of all the players


       it('should return a 200 if we search for all our players', async()=>{
                


        await supertest(app).get('/play/players')
        .expect(200);
    
    })

    // We can get all games from one player

    it('should return a 200 if we search for all games from a player', async()=>{
                
        // But first we need our user's ID

        const ourData = await UserModel.findOne({ name: 'testName' });

        let idArg = ourData?.toJSON()._id;

        await supertest(app).get(`/play/games/${idArg}`)
       
        .expect(200);
    
    })

    // We can get all success rates from the players, as well as the average

    it('should return a 200 if we search for our rates', async()=>{
                


        await supertest(app).get('/play/rates')
        .expect(200);
    
    })

    // We can delete all games from a player

    
    it('should return a 200 if we delete all a single player`s games', async()=>{
                
        // But first we need our user's ID

        const ourData = await UserModel.findOne({ name: 'testName' });

        await supertest(app).delete('/play/delete')
        .send({_id:ourData?.toJSON()._id})
        .expect(200);
    
    })

    // We can modify a player's name

    it('should return a 200 if we modify a player`s name', async()=>{
                
        // But first we need our user's ID

        const ourData = await UserModel.findOne({ name: 'testName' });

        await supertest(app).put('/play/update')
        .send({id:ourData?.toJSON()._id, name:'newName'})
        .expect(200);
    
    })




        })

     

        
