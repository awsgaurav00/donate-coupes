const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Set up EJS templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Homepage: List donation coupons
app.get('/', (req, res) => {
  // Sample data: In production, this data would come from a database.
  const coupons = [
    { id: 1, title: 'Donate $10 Coupon', description: 'Support local businesses with a $10 donation coupon.' },
    { id: 2, title: 'Donate $20 Coupon', description: 'Help charity initiatives by donating a $20 coupon.' }
  ];
  res.render('index', { coupons });
});

// Donate page: Form to donate a coupon code
app.get('/donate', (req, res) => {
  res.render('donate');
});

// Handle form submission (for demo purposes, just log the input)
app.post('/donate', (req, res) => {
  const { couponTitle, couponDescription, couponCode } = req.body;
  console.log('New Coupon Donation:', { couponTitle, couponDescription, couponCode });
  // Here you would typically save the donation to a database
  res.redirect('/');
});

// Additional routes for login/signup can be added later.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

