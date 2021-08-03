// Dependencies
const app = require('express')();
const axios = require('axios').default;
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

// Config
dotenv.config();
const PORT = process.env.PORT;
const DOMAIN = process.env.AUTH0_DOMAIN;
const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUDIENCE = process.env.AUTH0_AUDIENCE;


// Auth
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${DOMAIN}/.well-known/jwks.json`
    }),
    audience: `${AUDIENCE}`,
    issuer: `https://${DOMAIN}/`,
    algorithms: ['RS256']
});

// Middleware
// app.use(jwtCheck);
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send({
        hello: "world",
        home: "page", 
        public: true,
    })
});

app.get('/auth', jwtCheck, (req, res) => {
    res.send({
        message: `!!!AUTHORIZED!!!${"\n"}!!!SUPER SECRET DATA!!!`, 
        public: false,
    })
})



// Listener
app.listen(PORT, () => {
    console.log("listening on port: ", PORT)
});