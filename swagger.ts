import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tongue tinglers Api",
            description: "API endpoints",
            contact: {
                name: "",
                email: "",
                url: "",
            },
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3001/",
                description: "Local server",
            },
            {
                url: "https://api.tonguetingler.com/",
                description: "Live server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        tags: [
            {
                name: "AUTH", // auth starts
            },
            {
                name: "UserAddress",
            },
            {
                name: "Cart",
            },
            {
                name: "Admin > Vendors",
            },
            {
                name: "Regions",
            },
            {
                name: "Areas",
            },
            {
                name: "Franchisee",
            },
            {
                name: "QuickActions",
            },
            {
                name: "Files",
            },
            {
                name: "Gallery",
            },
            {
                name: "Questions",
            },
            {
                name: "Campaigns-Ad",
            },
            {
                name: "Affiliate",
            },
            {
                name: "FranchiseModel",
            },
            {
                name: "ProposalModel",
            },
            {
                name: "Admin > Permissions",
            },
            {
                name: "Admin > Roles",
            },
            {
                name: "Admin > Users", // admin starts
            },
            {
                name: "Admin > User > Profile",
            },
            {
                name: "Admin > User > Settings",
            },
            {
                name: "Admin > Testimonials",
            },
            {
                name: "Admin > Reviews",
            },
            {
                name: "Admin > Menu",
            },
            {
                name: "Admin > Menu > Category",
            },
            {
                name: "Admin > Menu > Product",
            },
            {
                name: "Admin > Franchise",
            },
            {
                name: "Admin > Ecommerce > Products",
            },
            {
                name: "Admin > Ecommerce > Taxes",
            },
            {
                name: "Admin > Ecommerce > Product > Category",
            },
            {
                name: "Admin > Ecommerce > Product > Tags",
            },
            {
                name: "Admin > Ecommerce > Orders",
            },
            {
                name: "Admin > Ecommerce > Invoices",
            },
            {
                name: "Admin > Retort > Products",
            },
            {
                name: "Admin > Retort > Product > Category",
            },
            {
                name: "Admin > Retort > Orders",
            },
            {
                name: "Admin > Retort > Invoices",
            },
            {
                name: "Admin > Logs > Audit-logs",
            },
            {
                name: "Admin > Logs > Email-logs",
            },
            {
                name: "Admin > Lead",
            },
            {
                name: "Admin > Contracts",
            },
            {
                name: "Payments",
            },
            {
                name: "Zoho Sign",
            },
            {
                name: "Admin > Lead > Follow Ups",
            },
            {
                name: "Frontend > Ecommerce > Products", // frontend starts
            },
            {
                name: "Frontend > Reviews",
            },
            {
                name: "Frontend > Testimonials",
            },
            {
                name: "Franchise > Profile",
            },
            {
                name: "Franchise > Settings",
            },
            {
                name: "Franchise > Ecommerce > Orders", // franchise starts
            },
            {
                name: "Franchise > Retort > Orders",
            },
            {
                name: "Franchise > Testimonials",
            },
            {
                name: "Franchise > Reviews",
            },
            {
                name: "Customer > Profile",
            },
            {
                name: "Admin > Customer",
            },
            {
                name: "Customer > Settings",
            },
            {
                name: "Customer > Testimonials",
            },
            {
                name: "Customer > Reviews",
            },
            {
                name: "Users > address",
            },
            {
                name: "Admin > Analytics > Leads",
            },
            {
                name: "Admin > Analytics > Orders",
            },
            {
                name: "Admin > Analytics > Retort",
            },
            {
                name: "PetPooja",
            },
        ],
    },
    // looks for configuration in specified directories
    apis: true
        ? [
              "./routes/*.js",
              "./apps/user-address/api/*.js",
              "./apps/area/api/*.js",
              "./apps/region/api/*.js",
              "./apps/cart/api/*.js",
              "./apps/vendor/api/*.js",
              "./apps/franchisee/api/*.js",
              "./apps/pdi-checkpoint/api/*.js",
              "./apps/ichecklist/api/*.js",
              "./apps/pdi/api/*.js",
              "./apps/quick-actions/api/*.js",
              "./apps/files/api/*.js",
              "./apps/gallery/api/*.js",
              "./apps/questions/api/*.js",
              "./apps/campaign/api/*.js",
              "./apps/affiliate/api/*.js",
              "./apps/franchise_model/api/*.js",
              "./apps/proposal_model/api/*.js",
              "./apps/pet-pooja/api/*.js",
              "./apps/zoho-sign/api/*.js",
              "./apps/referral/api/*.js",
              "./apps/auth/api/*.js",
              "./apps/address/api/*.js",
              "./apps/test-user/api/*.js",
              "./apps/admin-user/api/*.js",
              "./apps/franchise-user/api/*.js",
              "./apps/customer-user/api/*.js",
              "./apps/ecommerce/api/*.js",
              "./apps/ecommerce/api/web/*.js",
              "./apps/ecommerce/api/franchise/*.js",
              "./apps/retort/api/*.js",
              "./apps/retort/api/franchise/*.js",
              "./apps/lead/api/*.js",
              "./apps/testimonials/api/*.js",
              "./apps/reviews/api/*.js",
              "./apps/payments/api/*.js",
              "./apps/menu/api/*.js",
              "./apps/analytics/api/admin/*.js",
              "./apps/analytics/api/customer/*.js",
              "./apps/analytics/api/franchise/*.js",
              "./apps/crm/api/*.js",
              "./apps/contracts/api/*.js",
          ]
        : [
              "./routes/*.ts",
              "./apps/user-address/api/*.ts",
              "./apps/area/api/*.ts",
              "./apps/region/api/*.ts",
              "./apps/cart/api/*.ts",
              "./apps/vendor/api/*.ts",
              "./apps/franchisee/api/*.ts",
              "./apps/pdi-checkpoint/api/*.ts",
              "./apps/ichecklist/api/*.ts",
              "./apps/pdi/api/*.ts",
              "./apps/quick-actions/api/*.ts",
              "./apps/files/api/*.ts",
              "./apps/gallery/api/*.ts",
              "./apps/questions/api/*.ts",
              "./apps/campaign/api/*.ts",
              "./apps/affiliate/api/*.ts",
              "./apps/franchise_model/api/*.ts",
              "./apps/proposal_model/api/*.ts",
              "./apps/pet-pooja/api/*.ts",
              "./apps/zoho-sign/api/*.ts",
              "./apps/referral/api/*.ts",
              "./apps/auth/api/*.ts",
              "./apps/address/api/*.ts",
              "./apps/test-user/api/*.ts",
              "./apps/admin-user/api/*.ts",
              "./apps/franchise-user/api/*.ts",
              "./apps/customer-user/api/*.ts",
              "./apps/ecommerce/api/*.ts",
              "./apps/ecommerce/api/web/*.ts",
              "./apps/ecommerce/api/franchise/*.ts",
              "./apps/retort/api/*.ts",
              "./apps/retort/api/franchise/*.ts",
              "./apps/lead/api/*.ts",
              "./apps/testimonials/api/*.ts",
              "./apps/reviews/api/*.ts",
              "./apps/payments/api/*.ts",
              "./apps/menu/api/*.ts",
              "./apps/analytics/api/admin/*.ts",
              "./apps/analytics/api/customer/*.ts",
              "./apps/analytics/api/franchise/*.ts",
              "./apps/crm/api/*.ts",
              "./apps/contracts/api/*.ts",
          ],
    docExpansion: "none", // Can minimize the displayed logs in the Swagger UI.
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
    // Swagger Page
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Documentation in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}
export default swaggerDocs;
