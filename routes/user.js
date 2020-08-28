exports.index = function (req, res) {
    if (req.session.userId != null) {
        res.redirect('/home');
        return;
    }
    res.render('index.ejs', { message: '', ten: '' })
};
exports.login = function (req, res) {
    var post = req.body;
    var user = post.user;
    var pass = post.pass;
    var sql = "SELECT `id`, `name` FROM `account` WHERE username=? AND password=MD5(?)"
    db.query(sql, [user, pass], function (err, results) {
        if (err) console.log(err);
        if (results.length == 0) {
            res.render('index.ejs', { message: 'Dang nhap that bai', ten: '' });
        } else {
            req.session.userId = results[0].id;
            req.session.name = results[0].name;
            res.redirect('/home');
        }
    })
};
exports.signup = function (req, res) {
    var post = req.body;
    var email = post.email;
    var name = post.name;
    var pass1 = post.pass1;
    var pass2 = post.pass2;

    if (pass1 == pass2) {
        var sql = "INSERT INTO `account`(`id`, `username`, `password`, `name`, `deleted`) VALUES (null,?,MD5(?),?,0)"
        db.query(sql, [email, pass1, name], function (err) {
            if (err) console.log(err);
            else {
                res.redirect('/');

            }

        })
    }
};

exports.home = function (req, res) {
    if (req.session.userId == null) {
        res.redirect('/');
        return;
    }
    res.render('home.ejs', { ten: req.session.name });
};
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/")
    })
};