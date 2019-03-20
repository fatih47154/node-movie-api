const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('Director /api/director Test', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'fkarauzum', password: '12345'})
            .end((err, res) => {
                token = res.body.token;
                // console.log(token);
                done();
            });
    });

    describe('/Get Directors', () => {
        it('It Should Get All the Directors', (done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/Post Directors', () => {
        it('It Should Post a Director', (done) => {
            const director = {
                name: 'Test',
                surname: 'Director',
                bio: 'Deneme',
            };

            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    directorId = res.body._id;
                    done();
                });
        })
    });

    describe('/Get/:director_id Director', () => {
        it('It Should Get a Director by the Given ID', (done) => {
            chai.request(server)
                .get('/api/directors/' + directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200),
                    res.body[0].should.be.a('object');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('surname');
                    res.body[0].should.have.property('bio');
                    res.body[0].should.have.property('_id').eql(directorId);
                    done();
                });
        });
    });

    describe('/Put/:director_id Director', () => {
        it('It Should Update a Director Given by ID', (done) => {
            const director = {
                name: 'Director',
                surname: 'Test',
                bio: 'Crime'
            };

            chai.request(server)
                .put('/api/directors/' + directorId)
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        })
    });

    describe('/Delete/:director_id Director', () => {
        it('It Should Delete a Director Given by ID', (done) => {

            chai.request(server)
                .delete('/api/directors/' + directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        })
    });
});