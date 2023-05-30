const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./../server");
const should = chai.should();

chai.use(chaiHttp);
const Post = require("./../src/models/Post");

// Our parent block
describe("Posts", () => {
  //   beforeEach((done) => {
  //     //Before each test we empty the database
  //     Post.remove({}, (err) => {
  //       done();
  //     });
  //   });
  /*
   * Test the /GET route
   */
  describe("/GET post", () => {
    it("it should GET all the posts", (done) => {
      chai
        .request(server)
        .get("/api/v1/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("posts");
          res.body.posts.should.be.a("array");
          done();
        });
    });
  });
});
