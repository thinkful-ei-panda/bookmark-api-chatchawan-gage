const app = require('../src/app');
const {API_TOKEN} =require( '../src/config');

describe('App', () => {
  it('GET / responds with 200 containing "OwO wi mwaking gwod pwa gwas!"', ()=> {
    return supertest(app)
      .get('/')
      .set('Authorization', `${API_TOKEN}`)
      .expect(200, 'OwO wi mwaking gwod pwa gwas!');
  });
});