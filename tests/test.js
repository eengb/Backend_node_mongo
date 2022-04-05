
//import {jest} from '@jest/globals'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
const api = supertest(app)

let loggedUserId
let loggedUserToken
let sightid
let storyid


beforeEach( async () =>{

  const response = await api
  .post('/api/login')
  .send( { email: "dbd@app.fi",
  password: "admin"})
  .expect(200)
  .expect('Content-Type', /application\/json/)

  loggedUserToken= response.body.token



  loggedUserId = response.body.id


} )


describe('käyttäjä kirjautuu ja..', () => {



it('Luo uuden kohteen', async () => {

   
        const sight = {
            "destination": "testikohde",
            "country": "finland",
            "city": "kuopio",
            "description": "testiviesti",
            "picture": "www.fi", 
            "user": loggedUserId,
            "private": false
          };

      
    const response = await api
      .post('/api/sights')
      .send(sight)
      .set({"Authorization":`bearer ${loggedUserToken} `})
      .expect('Content-Type', /application\/json/)
      .expect(200)


      expect(response.body.destination).toBe("testikohde")

      sightid = response.body.id

      
  })


  it('Luo uuden matkakertomuksen', async () => {

   
    const story = {
        "description": "testikuvaus",
        "picture": "www.url.fi", 
        "user": loggedUserId,
        "sightId": sightid,
        "private": false
      };
  
const response = await api
  .post('/api/stories')
  .send(story)
  .set({"Authorization":`bearer ${loggedUserToken} `})
  .expect('Content-Type', /application\/json/)
  .expect(200)

  storyid= response.body.id
  expect(response.body.description).toBe("testikuvaus")


})

it('päivittää matkakertomuksensa description kentän ', async () => {

   
  const updatedStory = {
      "description": "uusi testikuvaus"
    };

const response = await api
.put(`/api/stories/${storyid}`)
.send(updatedStory)
.set({"Authorization":`bearer ${loggedUserToken} `})
.expect('Content-Type', /application\/json/)
.expect(200)

storyid= response.body.id
expect(response.body.description).toBe("uusi testikuvaus")


})


it('yrittää poistaa toisen käyttäjän matkakertomuksen', async () => {
  let wrongstoryid="624715adb3b5a68c8631691b"
  const response = await api
    .delete(`/api/stories/${wrongstoryid}`)
    .set({"Authorization":`bearer ${loggedUserToken} `})
    .expect('Content-Type', /application\/json/)    
    expect(response.body.deletedCount).toBe(0)
    
})


it('poistaa oman matkakertomuksensa', async () => {

    
    const response = await api
      .delete(`/api/stories/${storyid}`)
      .set({"Authorization":`bearer ${loggedUserToken} `})
      .expect('Content-Type', /application\/json/)
      
      expect(response.body.deletedCount).toBe(1)
      
  })

  it('poistaa lopuksi oman matkakohteensa', async () => {
    const response = await api
    .delete(`/api/sights/${sightid}`)
    .set({"Authorization":`bearer ${loggedUserToken} `})
    .expect('Content-Type', /application\/json/)
    
    expect(response.body.deletedCount).toBe(1) 
      
  })

})

afterAll(() => {
    mongoose.connection.close()

  })

