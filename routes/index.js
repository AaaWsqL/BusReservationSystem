var express = require('express');


var router = express.Router();

var cntrlMain=require('../controllers/main.js');

/* GET home page. */
router.get('/', cntrlMain.index) ;
router.post('/login',cntrlMain.tryLogin);
router.get('/dash',cntrlMain.dash);
router.post('/signup', cntrlMain.trySignup);
router.post('/signupForm', cntrlMain.signupForm);
router.get('/searchBus', cntrlMain.searchBus);
router.post('/bookTicket', cntrlMain.bookTicketForm);
router.get('/getTickets', cntrlMain.getUserTickets);
router.get('/getBusDetails', cntrlMain.getBusDetails);
router.get('/cancelTicket', cntrlMain.cancelTicket);


router.get('/data', function(req,res){
	console.log('/data got called')
	res.json([{"id": 1, "name": "Mymm", "city": "Pantano do Sul"},
        {"id": 2, "name": "Skyble", "city": "Guilmaro"},
        {"id": 3, "name": "Tagfeed", "city": "Gnosjö"},
        {"id": 4, "name": "Realcube", "city": "Jrashen"},
        {"id": 5, "name": "Bluejam", "city": "Zhangjiawo"},
        {"id": 6, "name": "Jayo", "city": "Obonoma"},
        {"id": 7, "name": "Cogidoo", "city": "Sungsang"},
        {"id": 8, "name": "Avavee", "city": "Diawara"},
        {"id": 9, "name": "Tagtune", "city": "Monywa"},
        {"id": 10, "name": "Centimia", "city": "Retkovci"}]);
});



module.exports = router;
