/* global it, describe, before, after */
var assert = require('assert')
var superagent = require('superagent')
var status = require('http-status')
var ip = require('ip')
var path = require('path')
var fs = require('fs')
var rimraf = require('rimraf')
var config = require('../dist/config.json')
const spawn = require('child_process').spawn
var dbPath = path.join('/tmp', 'test-database')
var testPort = 9999
var object1 = {
  id: 'mupro-01',
  info: {
    id: 'mupro-01',
    name: 'MuPro7Tage 01',
    activation_code: '07T-7b3-oqc',
    sip_uri: '108959003124'
  },
  mupro_name: 'Max Mustermann',
  mupro_mail: 'max.mustermann@br.de',
  creation_date: '03.05.2014',
  sec_activation_email: 'test@br.de'
}
var object2 = {
  id: 'mupro-02',
  info: {
    id: 'mupro-02',
    name: 'MuPro7Tage 02',
    activation_code: '07T-7b3-oq2',
    sip_uri: '108959003122'
  },
  mupro_name: 'Erika Musterfrau',
  mupro_mail: 'erika.musterfrau@br.de',
  creation_date: '21.05.2014',
  sec_activation_email: 'test2@br.de'
}
var object3 = {
  id: 'mupro-03',
  info: {
    id: 'mupro-03',
    name: 'MuPro7Tage 03',
    activation_code: '07T-7b3-oq3',
    sip_uri: '108959003123'
  },
  mupro_name: 'Malte Mustersohn',
  mupro_mail: 'malte.mustersohn@br.de',
  creation_date: '03.07.2014',
  sec_activation_email: 'test3@br.de'
}
var object4 = {
  id: 'mupro-03',
  info: {
    id: 'mupro-03',
    name: 'MuPro7Tage 03',
    activation_code: '07T-7b3-oq3',
    sip_uri: '108959003123'
  },
  mupro_name: 'Elina Mustertochter',
  mupro_mail: 'elina.mustertochter@br.de',
  creation_date: '08.08.2014',
  sec_activation_email: 'test3@br.de'
}
var csv = 'info;mupro_name;mupro_mail;sec_activation_email;activation_code;sip_uri;send_mail;mail_att;mail_app_links;own_mailtext;product_type;mail_comment\nMuPro7Tage 01;Max Mustermann;max.mustermann@br.de;test@br.de;07T-7b3-oqc;108959003124;1;mupro_kurzanleitung_7tage.pdf;ios,playstore,osx,win;1;einmalapp;Sehr geehrter Herr/Frau Max Mustermann,</br></br>für Sie wurde eine Lizenz für die ARD muPRO-Einmal-App erstellt.</br></br>Mithilfe der unten aufgeführten Links können Sie die App entweder für Ihr mobiles Gerät (Apple oder Android) aus den offiziellen Appstores laden, oder die App für Windows oder Apple-Rechner direkt herunterladen. Bitte beachten Sie, dass der direkte Download nur einmalig funktioniert, laden Sie die App also am besten direkt mit dem entsprechenden Gerät herunter.</br></br>Bitte beachten Sie auch die in dieser Email angehängte PDF mit einigen wichtigen Hinweisen zur Nutzung der App.</br></br>Mit dem unten angeführten Activation-Key und Ihrer Email-Adresse können Sie die App aktivieren.</br></br>Ihre SIP-Adresse lautet 108959003124 (nur relevant für unsere Techniker).</br></br>Ihr Activationkey lautet 07T-7b3-oqc</br></br>Mit freundlichen Grüßen,</br></br>Betriebszentrale Hörfunk, Bayerischer Rundfunk</br></br></br></br>'
var server
describe('UT03: API', function () {
  const uri = 'http://' + ip.address() + ':' + testPort
  before(function (done) {
    fs.mkdir(dbPath, function (error) {
      if (error) {
        done(error)
      } else {
        fs.writeFile(path.join(dbPath, object1.id + '.json'), JSON.stringify(object1), function (error) {
          if (error) {
            done(error)
          } else {
            fs.writeFile(path.join(dbPath, object2.id + '.json'), JSON.stringify(object2), function (error) {
              if (error) {
                done(error)
              } else {
                server = spawn('node', ['dist/app.js', dbPath, testPort])
                setTimeout(function () {
                  done()
                }, 1000)
              }
            })
          }
        })
      }
    })
  })
  describe('UT03-01: GET /accounts', function () {
    it('UT03-01-01: Should List all Accounts', function (done) {
      superagent.get(uri + '/accounts').end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        var result = JSON.parse(res.text)
        assert.equal(result.length, 2)
        assert.equal(result[0].id, object1.id)
        assert.equal(result[1].id, object2.id)
        done()
      })
    })
  })
  describe('UT03-02: GET /infos', function () {
    it('UT03-02-01: Should List all Infos', function (done) {
      superagent.get(uri + '/infos').end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        var result = JSON.parse(res.text)
        assert.equal(result.length, config.info.length)
        assert.equal(result[0].id, config.info[0].id)
        assert.equal(result[1].id, config.info[1].id)
        done()
      })
    })
  })
  describe('UT03-03: GET /infos/unused', function () {
    it('UT03-03-01: Should List all unused infos', function (done) {
      superagent.get(uri + '/infos/unused').end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        var result = JSON.parse(res.text)
        assert.equal(result.length, config.info.length - 2)
        done()
      })
    })
  })
  describe('UT03-04: POST /accounts', function () {
    it('UT03-04-01: Should Add an Account', function (done) {
      superagent.post(uri + '/accounts').send(object3).end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.CREATED)
        var result = JSON.parse(res.text)
        assert.equal(result.id, object3.id)
        superagent.get(uri + '/accounts').end(function (err, res) {
          assert.ifError(err)
          assert.equal(res.status, status.OK)
          var result = JSON.parse(res.text)
          assert.equal(result.length, 3)
          assert.equal(result[0].id, object1.id)
          assert.equal(result[1].id, object2.id)
          assert.equal(result[2].id, object3.id)
          done()
        })
      })
    })
    it('UT03-04-02: Should Error on no Data in Post', function (done) {
      superagent.post(uri + '/accounts').send({}).end(function (err, res) {
        if (err) {
          assert.equal(res.status, status.BAD_REQUEST)
          superagent.get(uri + '/accounts').end(function (err, res) {
            assert.ifError(err)
            assert.equal(res.status, status.OK)
            var result = JSON.parse(res.text)
            assert.equal(result.length, 3)
            assert.equal(result[0].id, object1.id)
            assert.equal(result[1].id, object2.id)
            assert.equal(result[2].id, object3.id)
            done()
          })
        } else {
          done(new Error('Here be an Error'))
        }
      })
    })
  })
  describe('UT03-05: PUT /accounts/:id', function () {
    it('UT03-05-01: Should Update an Account', function (done) {
      superagent.put(uri + '/accounts/' + object3.id).send(object4).end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        var result = JSON.parse(res.text)
        assert.equal(result.id, object3.id)
        assert.equal(result.mupro_name, object4.mupro_name)
        superagent.get(uri + '/accounts').end(function (err, res) {
          assert.ifError(err)
          assert.equal(res.status, status.OK)
          var result = JSON.parse(res.text)
          assert.equal(result.length, 3)
          assert.equal(result[0].id, object1.id)
          assert.equal(result[1].id, object2.id)
          assert.equal(result[2].id, object3.id)
          assert.equal(result[2].mupro_name, object4.mupro_name)
          done()
        })
      })
    })
    it('UT03-05-02: Should Error on no Data in PUT', function (done) {
      superagent.put(uri + '/accounts/' + object3.id).send({}).end(function (err, res) {
        if (err) {
          assert.equal(res.status, status.BAD_REQUEST)
          superagent.get(uri + '/accounts').end(function (err, res) {
            assert.ifError(err)
            assert.equal(res.status, status.OK)
            var result = JSON.parse(res.text)
            assert.equal(result.length, 3)
            assert.equal(result[0].id, object1.id)
            assert.equal(result[1].id, object2.id)
            assert.equal(result[2].id, object3.id)
            assert.equal(result[2].mupro_name, object4.mupro_name)
            done()
          })
        } else {
          done(new Error('Here be an Error'))
        }
      })
    })
    it('UT03-05-03: Should Error on wrong ID', function (done) {
      superagent.put(uri + '/accounts/someid').send(object4).end(function (err, res) {
        if (err) {
          assert.equal(res.status, status.NOT_FOUND)
          superagent.get(uri + '/accounts').end(function (err, res) {
            assert.ifError(err)
            assert.equal(res.status, status.OK)
            var result = JSON.parse(res.text)
            assert.equal(result.length, 3)
            assert.equal(result[0].id, object1.id)
            assert.equal(result[1].id, object2.id)
            assert.equal(result[2].id, object3.id)
            assert.equal(result[2].mupro_name, object4.mupro_name)
            done()
          })
        } else {
          done(new Error('Here be an Error'))
        }
      })
    })
  })
  describe('UT03-06: DELETE /accounts/:id', function () {
    it('UT03-06-01: Should Delete an Account', function (done) {
      superagent.delete(uri + '/accounts/' + object3.id).end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        var result = JSON.parse(res.text)
        assert.equal(result, true)
        superagent.get(uri + '/accounts').end(function (err, res) {
          assert.ifError(err)
          assert.equal(res.status, status.OK)
          var result = JSON.parse(res.text)
          assert.equal(result.length, 2)
          assert.equal(result[0].id, object1.id)
          assert.equal(result[1].id, object2.id)
          done()
        })
      })
    })
    it('UT03-06-02: Should Error on wrong ID', function (done) {
      superagent.delete(uri + '/accounts/someid').end(function (err, res) {
        if (err) {
          assert.equal(res.status, status.NOT_FOUND)
          superagent.get(uri + '/accounts').end(function (err, res) {
            assert.ifError(err)
            assert.equal(res.status, status.OK)
            var result = JSON.parse(res.text)
            assert.equal(result.length, 2)
            assert.equal(result[0].id, object1.id)
            assert.equal(result[1].id, object2.id)
            done()
          })
        } else {
          done(new Error('Here be an Error'))
        }
      })
    })
  })
  describe('UT03-07: GET /accounts/:id/csv', function () {
    it('UT03-07-01: Should get a CSV-File for the ID', function (done) {
      superagent.get(uri + '/accounts/' + object1.id + '/csv').end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, status.OK)
        assert.equal(res.type, 'text/csv')
        assert.equal(res.header['content-disposition'], 'attachment; filename=' + object1.id + '.csv')
        assert.equal(res.text, csv)
        done()
      })
    })
    it('UT03-07-02: Should Error on wrong ID', function (done) {
      superagent.get(uri + '/accounts/someid/csv').end(function (err, res) {
        if (err) {
          assert.equal(res.status, status.NOT_FOUND)
          done()
        } else {
          done(new Error('Here be an Error'))
        }
      })
    })
  })
  after(function (done) {
    server.kill('SIGHUP')
    setTimeout(function () {
      rimraf(dbPath, function (error) {
        if (error) {
          done(error)
        } else {
          done()
        }
      })
    }, 1000)
  })
})
