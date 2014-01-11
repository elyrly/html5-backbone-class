var Person = Backbone.Model.extend({
  intitalize: function(){
      //alert("BACKBONE!!!");
  },
    defaults: {
        name: 'Guest User',
        age: 23,
        occupation: 'worker'
    }
// if you wanted to run on server use url: "http://www...."
});

var Router = Backbone.Router.extend({ //also remember to add a new function see line 80 & 81
    routes: {
        '': 'index',
        'newpage/:id': 'newpage'
    },
    index: function(){
        alert("index!")
    },
    newpage: function(id){
        alert("newpage: "+id);
    }
});

//The View for a Person
var PersonView = Backbone.View.extend({
    tagName: 'li',

    template: Handlebars.compile($('#personTemplate').html()),
// or you have to type template: "<strong></strong>+asdf"
    initialize: function(){
        this.render();
    },

    render: function(){
        this.$el.html( this.template(this.model.toJSON()));
    }
});



var LoggedInView = Backbone.View.extend({
    el: ".loggedIn",
    initialize: function(){
       this.render();
    },
    render: function(){
        this.collection.each(function(person){
            var personView = new PersonView({ model: person });
            this.$el.append(personView.el);
        }, this);
       // this.$el.html( this.model.get('name') + this.model.get('age') + this.model.get('occupation'));
    }
});


var PeopleCollection = Backbone.Collection.extend({
    model: Person
});

var peopleCollection = new PeopleCollection([
    {
        name: 'Mohit Jain',
        age: 26
    },
    {
        name: 'Taroon Tyagi',
        age: 25,
        occupation: 'web designer'
    },
    {
        name: 'Rahul Narang',
        age: 26,
        occupation: 'Java Developer'
    }
]);

var JumbotronView = Backbone.View.extend({
    el: ".jumbotron",
    initialize: function(){
        person = new Person();
      // this.loggedInView = new LoggedInView({ model: person });
      this.loggedInView = new LoggedInView({ collection: peopleCollection });
      this.render(); //not neccessary but its common practice

      // person.on("sync",function(){"alert("test")}) //when a data is loaded in to model

    },
    events:{
        "click #learnMore": "learnMore"
    },
    learnMore: function(){
       alert("learnMore clicked!");
        this.loggedInView.render();
    }
});



new Router();
Backbone.history.start();
jumboTronView = new JumbotronView();
var person = new Person(); //if you don't put var is will look up a prototype chain (override other poeple code)
