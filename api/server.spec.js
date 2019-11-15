const request = require('supertest');

const server = require('./server');

it("should set db evironment to testing", function () {
  expect(process.env.DB_ENV).toBe('testing');
})

describe("server", function () {
  describe('GET /', () => {

    it('should return status 200', () => {

      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it('should be json', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch(/json/i);
        })
    })

    it('should return api: up', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual({ api: "up", environment: "testing" })
        })
    })


  }) // desc 'GET /'


})