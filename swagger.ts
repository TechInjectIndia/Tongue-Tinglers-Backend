import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tongue tinglers Api',
            description: "API endpoints",
            contact: {
                name: "",
                email: "",
                url: ""
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3001/",
                description: "Local server"
            },
            {
                url: "<live url>",
                description: "Live server"
            },
        ],
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        },
        tags: [
            {
                name: 'Admin > AUTH'
            },
            {
                name: 'Franchise > AUTH'
            },
            {
                name: 'Admin > Users'
            },
            {
                name: 'Admin > Franchise'
            },
            {
                name: 'Admin > Permissions'
            },
            {
                name: 'Admin > Roles'
            },
            {
                name: 'Admin > Ecommerce > Products'
            },
            {
                name: 'Admin > Ecommerce > Product > Category'
            },
            {
                name: 'Admin > Ecommerce > Product > Tags'
            },
            {
                name: 'Admin > Ecommerce > Product > Orders'
            },
            {
                name: 'Admin > Ecommerce > Product > Orders > Invoices'
            },
            {
                name: 'Admin > Logs > Audit-logs'
            },
            {
                name: 'Admin > Logs > Email-logs'
            },
            {
                name: 'Admin > Lead'
            },
            {
                name: 'Admin > Lead > Follow Ups'
            }]
    },
    // looks for configuration in specified directories
    apis: [
        './routes/*.ts',
        './apps/admin-auth/api/*.ts',
        './apps/franchise-auth/api/*.ts',
        './apps/admin-user/api/*.ts',
        './apps/ecommerce/api/*.ts',
        './apps/lead/api/*.ts'
    ],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}
export default swaggerDocs