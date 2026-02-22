var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            description: "API endpoints for a library blog services documented on swagger",
            contact: {
                name: "Arshad Mujawar",
                email: "arshmujawar17@@gmail.com",
                url: ""
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server"
            },
            {
                url: "<your live url here>",
                description: "Live server"
            },
        ],
        components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', 
            },
        },
    },
    security: [
        {
            bearerAuth: []
        }
    ]
    },
    // looks for configuration in specified directories
    apis: ['./routes/*.js'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}
module.exports =  swaggerDocs;