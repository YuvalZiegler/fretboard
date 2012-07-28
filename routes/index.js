
/*
 * GET home page.
 */



exports.index = function(req, res){
    var layout = req.app.settings.env == "development" ? 'layout.jade' : 'layout-min.jade'
    res.render('index', { title: 'Fretboard', layout: layout });
};
