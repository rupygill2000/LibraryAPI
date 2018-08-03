var should = require('should');
var sinon = require('sinon');

describe('Book Controller Tests:',function(){
    describe('Post',function(){
        it('No book should be allowed without Title', function(){
                var Book = function(Book){this.save = function(){}};

                var req ={
                        body: {
                            author: 'Bir'
                        }
                    }
                var res = {

                    status: sinon.spy(),
                        send: sinon.spy()
                }
                var bookController = require('../controller/bookController.js')(Book);
                bookController.post(req,res);
                res.status.calledwith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
                res.send.calledwith('Title is required').should.equal(true);
            

        })

    })


})