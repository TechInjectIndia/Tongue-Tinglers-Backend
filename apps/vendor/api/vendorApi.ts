// routes/vendor.ts
import * as express from "express";
import VendorController from "../controllers/vendorController";
import * as VendorValidation from "../validations/vendorValidations";
import { hasPermission } from "../../../middlewares";

const router = express.Router();

const {
  validateCreateVendorBody,
  validateEditVendorBody,
  validateEditVendorParams,
  validateListVendorQuery,
  validateEditMultipleIdsBody,
} = VendorValidation;

// ====== Vendors Starts ======
/**
 * @swagger
 * /api/admin/vendors/create:
 *   post:
 *     summary: Create a new Vendor
 *     tags: [Admin > Vendors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - company_name
 *              - gst_number
 *              - company_address
 *              - company_email
 *              - company_phone
 *              - first_name
 *              - last_name
 *              - email
 *              - phone
 *            properties:
 *              company_name:
 *                type: string
 *              gst_number:
 *                type: string
 *              company_address:
 *                type: string
 *              company_email:
 *                type: string
 *              company_phone:
 *                type: string
 *              first_name:
 *                type: string
 *              last_name:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *     responses:
 *       '200':
 *         description: Vendor created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/vendors/list:
 *   get:
 *     summary: Get all Vendors
 *     tags: [Admin > Vendors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Vendors retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/vendors/get/{id}:
 *   get:
 *     summary: Get a Vendor by ID
 *     tags: [Admin > Vendors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Vendor to retrieve
 *     responses:
 *       '200':
 *         description: Vendor retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Vendor not found
 * 
 * /api/admin/vendors/update/{id}:
 *   put:
 *     summary: Update a Vendor
 *     tags: [Admin > Vendors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Vendor to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              company_name:
 *                type: string
 *              gst_number:
 *                type: string
 *              company_address:
 *                type: string
 *              company_email:
 *                type: string
 *              company_phone:
 *                type: string
 *              first_name:
 *                type: string
 *              last_name:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *     responses:
 *       '200':
 *         description: Vendor updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Vendor not found
 * 
 * /api/admin/vendors/delete:
 *   delete:
 *     summary: Delete Vendors
 *     tags: [Admin > Vendors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              ids:
 *                type: array
 *                items:
 *                  type: string
 *                description: Array of Vendor IDs to delete
 *     responses:
 *       '200':
 *         description: Vendors deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Vendor not found
 */
router.post("/create", hasPermission('vendors', 'create'), validateCreateVendorBody, VendorController.create);
router.get("/list", hasPermission('vendors', 'read'), validateListVendorQuery, VendorController.list);
router.get("/get/:id", hasPermission('vendors', 'read'), validateEditVendorParams, VendorController.get);
router.put("/update/:id", hasPermission('vendors', 'update'), validateEditVendorParams, validateEditVendorBody, VendorController.update);
router.delete("/delete", hasPermission('vendors', 'delete'), validateEditMultipleIdsBody, VendorController.delete);
// ====== Vendors Ends ======

export default router;
