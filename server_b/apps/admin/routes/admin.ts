import * as express from "express";
import AdminController from "apps/admin/controllers/admin/admin.controller";
import * as AdminValidation from "../controllers/admin/admin.validation";

const router = express.Router();

const {
  validateCreateRoleBody,
  validateEditRoleBody,
  validateEditRoleParams,
  validateListRoleQuery,
  validateListAdminQuery,
  validateCreateAdminBody,
  validateEditAdminParams,
  validateEditAdminBody,
  validateEditMultipleIdsBody
} = AdminValidation;

const {
  getRoles,
  getRole,
  addRole,
  editRole,
  deleteRole,
  getAdmins,
  addAdmin,
  editAdmin,
  deleteAdmin,
  getAdmin,
} = AdminController;

// ====== Admin Roles ======
router.get("/list-roles", validateListRoleQuery, getRoles);
router.get("/role/:id", validateEditRoleParams, getRole);
router.post("/add-role", validateCreateRoleBody, addRole);
router.post(
  "/edit-role/:id",
  validateEditRoleParams,
  validateEditRoleBody,
  editRole
);
router.delete("/delete-role", validateEditMultipleIdsBody, deleteRole);

// ====== Admins ======
router.get("/list", validateListAdminQuery, getAdmins);
router.get("/admin/:id", validateEditAdminParams, getAdmin);
router.post("/add", validateCreateAdminBody, addAdmin);
router.post(
  "/edit/:id",
  validateEditAdminParams,
  validateEditAdminBody,
  editAdmin
);
router.delete("/delete", validateEditMultipleIdsBody, deleteAdmin); // Soft delete single or multiple

export default router;
