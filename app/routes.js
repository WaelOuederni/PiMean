/**
 * Created by WAEL on 13/04/2017.
 */
module.exports = function(app, passport) {
    var Test = require('./models/section');

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {


    res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/signup', function(req, res) {


        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.post('/login', passport.authenticate('local-login',{
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/sectionlist',function (req, res) {
        console.log("I received a GET request");

        Test.find(function (err,docs) {
            console.log(docs);
            res.json(docs);
        });
    });
    app.post('/sectionlist',function(req, res){
        console.log(req.body);

        var test = new Test(req.body);
        test.save(function(err,doc) {
            if (err) {
                return res.send(err);
            } else {
                req.flash('success', 'Your name was updated');
            }
            res.json(doc);
        });
    });

    app.delete('/contactlist/:id' ,function (req, res) {

        Test.remove({_id: req.params.id}, function(err, doc) {
            if (err) {
                return res.send(err);
            }
            res.json(doc);
        });
    });

    app.get('/sectionlist/:id', function (req, res) {

        Test.findOne({ _id: req.params.id},{"name" :1,"email": 1}, function(err, doc) {
            if (err) {
                return res.send(err);
            }
            res.json(doc);
        });
    });
    app.put('/sectionlist/:id',function (req,res) {

        Test.findOne({ _id: req.params.id }, function(err, doc) {
            if (err) {
                return res.send(err);
            }
            for (prop in req.body) {
                doc[prop] = req.body[prop];
            }
            // save the movie
            doc.save(function(err) {
                if (err) {
                    return res.send(err);
                }
                res.json(doc);
            });
        });
    });

};
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}