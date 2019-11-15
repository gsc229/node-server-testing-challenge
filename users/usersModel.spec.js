const db = require('../data/dbConfig');
const { insert, remove, getAll } = require('./usersModel');

describe('usersModel', () => {

  describe('insert()', () => {
    beforeEach(async () => {
      await db("users").truncate();
    })


    it('should insert a user', async () => {
      await insert({ username: "Greg" })
      const users = await db('users')
      expect(users).toHaveLength(1);
    })

    it('should insert the users', async () => {

      await insert({ username: "Steve" })
      await insert({ username: "Sam" })

      const users = await db('users');

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe('Steve');
      expect(users[1].username).toBe('Sam');

    })

    it("should return the inserted user", async function () {
      let user = await insert({ username: "Bill" });
      expect(user.username).toBe("Bill");
      expect(user.id).toBeDefined(); // now I know it's coming from the db

      user = await insert({ username: "Ted" });
      expect(user.username).toBe("Ted");
      expect(user.id).toBeDefined();
    });
  }) // describe(insert)


  describe("remove()", () => {
    beforeEach(async () => {
      await db("users").truncate();
    })


    it('should return 1', async () => {
      await insert({ username: "Bill" })
      await insert({ username: "Ted" });
      let deletes = await remove(1)
      expect(deletes).toBe(1);
    })

  })// describe remove


  describe('getAll()', () => {
    beforeEach(async () => {
      await db("users").truncate();
    })
    it('should return an arry of users', async () => {
      await insert({ username: "Bill" })
      await insert({ username: "Ted" });

      let allUsers = await getAll();
      expect(typeof allUsers).toBe("object");
      expect(allUsers[0].username).toBe("Bill");
    })
  })



})// describe('usersModel')