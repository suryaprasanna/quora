"use strict";
// NPM install mongoose and chai. Make sure mocha is globally
// installed
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
// Create a new schema that accepts a 'name' object.
const User = require('../../model/user');
const Ques = require('../../model/question');
const Comment = require('../../model/comment');
const Topic = require('../../model/topic');
// const Ques_user = require('../../model/question_user');
// const Ques_ans = require('../../model/question_answer');
const Ans = require('../../model/answer');
// const Ans_user = require('../../model/answer_user');
const UserUtil = require('../../data/users');
const QuesUtil = require('../../data/questions');
const AnsUtil = require('../../data/answers');
const TopicUtil = require('../../data/topics');
const FollowUtil = require('../../data/follows');
var Promises = require('promise');

//Create a new collection called 'Name'
describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost:27017/testDatabase', { useMongoClient: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
    //   console.log('We are connected to test database!');
      done();
    });
  });
  
  describe('Test Database', function() {
    it('Database is connected.', function(done) {
        done();
    });
    var user_obj = new User();
    var ques_id = '';
    //Save object with 'name' value of 'Mike"

    var newUser = new User();
    newUser.name = 'user1';
    newUser.username = 'user1';
    newUser.email = 'user1@ufl.edu';
    newUser.password = 'password';

    var newUser_obj = new User();

    it('New user saved to test database', function(done) {
      var testName = User({
        name: 'Mike',
        username: 'mika',
        email: 'mika@ufl.edu',
        password: 'mikamike'
      }); 
      UserUtil.addUser(testName, done);

      
    });

    it('Should authenticate the above added user', function(done){
      UserUtil.getUserbyname('mika', function(err, user){
        user_obj = user;
        UserUtil.comparePassword('mikamike', user.password,err => {
          if(err) { throw new Error('Should generate error!'); }
          done();
        });
      });
      
    });

    it('Should retrieve user details from test database', function(done) {
        //Look up the 'Mike' object previously saved.
        User.findOne({name: 'Mike'}, (err, user) => {
          if(err) {throw err;}
          if(user.length === 0) {throw new Error('No data!');}
          done();
        });
    });

    it('Check unique key constraint on username', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = User({
        name: 'Mike1',
        username: 'mika',
        email: 'mika1@ufl.edu',
        password: 'mikamike1'
      });
      UserUtil.addUser(wrongSave, err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    
    it('Check unique key constraint on email', function(done) {
        //Attempt to save with wrong info. An error should trigger
        var wrongSave = User({
          name: 'Mike1',
          username: 'mika1',
          email: 'mika@ufl.edu',
          password: 'mikamike1'
        });
        UserUtil.addUser(wrongSave, err => {
          if(err) { return done(); }
          throw new Error('Should generate error!');
        });
      });
      
    it('Test find all method in users', function(done) {
      //Look up the 'Mike' object previously saved.
      User.find({}, (err, user) => {
        if(err) {throw err;}
        if(user.length === 0) {throw new Error('No data!');}
        // console.log(user.email);
        done();
      });
    });

    var ques_obj = new Ques();
    var q1 = new Ques();
      q1.is_anonymous = false;
      q1.votes = 0;
      q1.created_on = new Date();
      q1.updated_on = new Date();
      q1.user_id = user_obj._id;

    it('Ask a question', function(done){
      q1.question = "Is question api working?"
      QuesUtil.askQuestion(q1, 'Is question api working?', done);
    }); 



     it('Check for question in database', function(done){
       
        q1.question = 'When did the great war start?'

       QuesUtil.askQuestion(q1,'When did the great war start?',function(err,resp){
         if(err)
            {throw new Error('Error while posting question')}
        ques_id = resp._id;
         QuesUtil.getQuestion(ques_id).then((data) => {
            ques_obj = data;
            if(data.question == 'When did the great war start?'){
                done();
            }
            else
                {throw new Error('No data found in database!')}
         });

         //Ques.findById(id, (err, ques) => {
           //console.log("QUESTION OBJ is: "+ques);
           //check for null ans object!!!!!!
         //  if(err) 
         //   {
         //       console.log("Error inside is: "+err);
         //       throw err;
         //   }
          // if(ques==null || ques.length === 0) {throw new Error('No data!');}
         //  done();
         //});
       });
     });



     it('Edit a question', function(done){

       q1.question ='When did the great war start?'
       
       var id = ques_id;
        var name = "When did the world war 1 started?";
        var user_id = user_obj._id;
        QuesUtil.getQuestion(id, function(err, ques){
          if(ques.user_id != user_id) { throw new Error('Should generate error!');}
          QuesUtil.editQuestion(ques.e_id, name).then((data) => {
           done();
          }).catch((err) => {
           throw new Error('Failed to edit a question');
          });
        });
        done();
    }); 

    var ans = new Ans();
    ans.user_id = user_obj._id;
    ans.is_anonymous = "true";
    ans.votes = "0";
    ans.created_on = new Date();
    ans.updated_on = new Date();

    var ans_obj = new Ans();
    it('Answer a question',function(done){
    
      var question_id = ques_id;
      ans.answer = "Great war was started on 1914.";
      AnsUtil.putAnswer(ans,ques_obj).then((data) => {
        ans_obj = data;
        done();
      }).catch((err) => {
        throw new Error('Should generate error!');
      });
    });

    // it('Check for Answer in database', function(done){
    //   var ans = Ans({
    //     user_id: '11',
    //     is_anonymous: 'true',
    //     votes: '0',
    //     created_on: new Date(),
    //     updated_on: new Date()
    //   });
    //   var question_id = "12";
    //   var name = "Great war was started on 1914.";

    //   AnsUtil.putAnswer(ans,question_id,name,function(err,resp){
    //     var id = resp.id;
    //     Ans.findById(id, (err, ans) => {
    //       //console.log("ANSWER OBJ is: "+ans);
    //       //check for null ans object!!!!!!
    //       if(err) {throw err;}
    //       if(ans==null || ans.length === 0) {throw new Error('No data!');}
    //       done();
    //     });
    //   });
    // });



     it('Edit an Answer',function(done){
       
        var answer = "Great war was started on July 28th, 1914.";
         
        AnsUtil.editAnswer(ans_obj, answer).then((data) => {
            done(); 
        }).catch((err) => {
            throw new Error('Should generate error!');
        });
       
     });

     it('Should retrieve question details from test database', function(done) {
       //Look up the 'ques' object previously saved.
       Ques.findOne({question: 'When did the great war start?'}, (err, ques) => {
         if(err) {throw err;}
         if(ques.length === 0) {throw new Error('No data!');}
         done();
       });
    });

    it('Should retrieve list of all questions from test database', function(done) {
      QuesUtil.getQuestions().then((data) => {
        done();
      }).catch((err) => {
        throw new Error('Should generate error!'); 
      });
    });


    //Topics API
    var topic_obj = new Topic();

    it('create a topic', function(done){
        var topic = new Topic();
        topic.topic  = "D.C.comics";
        TopicUtil.createTopic(topic).then((data) => {
            topic_obj = data;
            done();
        }).catch((err)=>{
            throw new Error('Should generate error!'); 
        });
    });

    it('get a topic', function(done){
        TopicUtil.getTopic(topic_obj._id).then((data) => {
            done();
        }).catch((err) => {
            throw new Error('Should generate error!'); 
        });
    });

    it('get list of all Topics', function(done){
        TopicUtil.getTopics().then((data) => {
            done();
        }).catch((err) => {
            throw new Error('Should generate error!'); 
      });
    });

    var flw = '';
    var newUser_id = '';
    //Follow API
    it('Follow Question',function(done){
        UserUtil.addUser(newUser, function(err, user){
            newUser_obj = user;
            FollowUtil.followQuestion(ques_id,user).then((data)=>{
                flw = data;
                done();
            }).catch((err)=>{
                throw new Error('Should generate error!'); 
            });
        });
        
    });

    
    it('Follow Topic', function(done){
        FollowUtil.followTopic(topic_obj._id,user_obj).then((data)=>{
            done();
        }).catch((err)=>{
            throw new Error('Should generate error!'); 
        });

    });

    it('Follow User', function(done){
        FollowUtil.followUser(newUser_obj._id,user_obj).then((data)=>{
            done();
        }).catch((err)=>{
            throw new Error('Should generate error!');
        })

    });

    it('Unfollow Question',function(done){
        FollowUtil.unfollowQuestion(ques_id,newUser_obj).then((data)=>{
            done();
        }).catch((err)=>{
            throw new Error('Should generate error!');
        });
        
    });

    it('Unfollow Topic', function(done){
        FollowUtil.unfollowTopic(topic_obj._id,user_obj).then((data)=>{
            done();
        }).catch((err)=>{
            throw new Error('Should generate error!');
        });
    });

    it('Unfollow User', function(done){
        FollowUtil.unfollowUser(newUser_obj._id,user_obj).then((data)=>{
            done();
        }).catch((err)=>{
            console.log(err);
            throw new Error('Should generate error!');
        });
    });



});
  //After all tests are finished drop database and close connection
  after(function(done){
     mongoose.connection.db.dropDatabase(function(){
       mongoose.connection.close(done);
     });
  });
});