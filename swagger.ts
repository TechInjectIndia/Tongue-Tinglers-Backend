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
                name: 'AUTH' // auth starts
            },
            {
                name: 'Zoho Sign'
            },
            {
                name: 'Admin > Permissions'
            },
            {
                name: 'Admin > Roles'
            },
            {
                name: 'Admin > Users' // admin starts
            },
            {
                name: 'Admin > User > Profile'
            },
            {
                name: 'Admin > User > Settings'
            },
            {
                name: 'Admin > Testimonials'
            },
            {
                name: 'Admin > Reviews'
            },
            {
                name: 'Admin > Menu'
            },
            {
                name: 'Admin > Menu > Category'
            },
            {
                name: 'Admin > Menu > Product'
            },
            {
                name: 'Admin > Franchise'
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
                name: 'Admin > Ecommerce > Orders'
            },
            {
                name: 'Admin > Ecommerce > Invoices'
            },
            {
                name: 'Admin > Retort > Products'
            },
            {
                name: 'Admin > Retort > Product > Category'
            },
            {
                name: 'Admin > Retort > Orders'
            },
            {
                name: 'Admin > Retort > Invoices'
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
            },
            {
                name: 'Admin > User > Payments'
            },
            {
                name: 'Frontend > Ecommerce > Products' // frontend starts
            },
            {
                name: 'Frontend > Reviews'
            },
            {
                name: 'Frontend > Testimonials'
            },
            {
                name: 'Franchise > Profile'
            },
            {
                name: 'Franchise > Settings'
            },
            {
                name: 'Franchise > Ecommerce > Orders' // franchise starts
            },
            {
                name: 'Franchise > Retort > Orders'
            },
            {
                name: 'Franchise > Testimonials'
            },
            {
                name: 'Franchise > Reviews'
            },
            {
                name: 'Customer > Profile'
            },
            {
                name: 'Admin > Customer'
            },
            {
                name: 'Customer > Settings'
            },
            {
                name: 'Customer > Testimonials'
            },
            {
                name: 'Customer > Reviews'
            },
            {
                name: 'Users > address'
            },
            {
                name: 'Admin > Analytics > Leads'
            },
            {
                name: 'Admin > Analytics > Orders'
            },
            {
                name: 'Admin > Analytics > Retort'
            },
            {
                name: 'PetPooja'
            },
        ]
    },
    // looks for configuration in specified directories
    apis: [
        './routes/*.ts',
        './apps/pet-pooja/api/*.ts',
        './apps/zoho-sign/api/*.ts',
        './apps/auth/api/*.ts',
        './apps/address/api/*.ts',
        './apps/test-user/api/*.ts',
        './apps/admin-user/api/*.ts',
        './apps/franchise-user/api/*.ts',
        './apps/customer-user/api/*.ts',
        './apps/ecommerce/api/*.ts',
        './apps/ecommerce/api/web/*.ts',
        './apps/ecommerce/api/franchise/*.ts',
        './apps/retort/api/*.ts',
        './apps/retort/api/franchise/*.ts',
        './apps/lead/api/*.ts',
        './apps/testimonials/api/*.ts',
        './apps/reviews/api/*.ts',
        './apps/payments/api/*.ts',
        './apps/menu/api/*.ts',
        './apps/analytics/api/admin/*.ts',
        './apps/analytics/api/customer/*.ts',
        './apps/analytics/api/franchise/*.ts',
        './apps/crm/api/*.ts',
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