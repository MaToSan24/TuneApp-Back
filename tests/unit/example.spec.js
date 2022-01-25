let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

let userId;

describe('Register: ', () => {
    it('should register successfully', (done) => {
    chai.request(url)
      .post('/register')
      .send({username: "testUsername", email: "testEmail@test.com", password: "testPassword"})
      .end(function(err,res) {
      console.log(res.body)
      userId = res.body.user._id;
      expect(res).to.have.status(200);
      done();
      });
    });
});

describe('Login: ', () => {
  it('should login successfully', (done) => {
  chai.request(url)
    .post('/login')
    .send({username: "testUsername", email: "testEmail@test.com", password: "testPassword"})
    .end(function(err,res) {
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
  });
});

describe('Delete user: ', () => {
  it('should delete the users created on the previous tests', (done) => {
  chai.request(url)
    .delete('/users/' + userId)
    .end(function(err,res) {
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
  });
});

// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).to.include(msg)
//   })
// })
