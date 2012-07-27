
/*
 * GET home page.
 */

exports.index = function(req, res){   
   res.render('index', { title: 'Fretboard', layout: 'layout-min.jade' });
};
