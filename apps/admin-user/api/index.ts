import * as express from "express";
import AdminController from "../controllers/user";
import RolesController from "../controllers/roles";
import * as AdminValidation from "../validations";

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

const { getAdmins, addAdmin, editAdmin, deleteAdmin, getAdmin, } = AdminController;
const { getRoles, getRole, addRole, editRole, deleteRole, } = RolesController;

// ====== Admin Roles ======
router.get("/list-roles", validateListRoleQuery, getRoles);
router.get("/role/:id", validateEditRoleParams, getRole);
router.post("/add-role", validateCreateRoleBody, addRole);
router.post("/edit-role/:id", validateEditRoleParams, validateEditRoleBody, editRole);
router.delete("/delete-role", validateEditMultipleIdsBody, deleteRole);

// ====== Admins ======
router.get("/list", validateListAdminQuery, getAdmins);
router.get("/admin/:id", validateEditAdminParams, getAdmin);
router.post("/add", validateCreateAdminBody, addAdmin);
router.post("/edit/:id", validateEditAdminParams, validateEditAdminBody, editAdmin);
router.delete("/delete", validateEditMultipleIdsBody, deleteAdmin); // Soft delete single or multiple

export default router;
