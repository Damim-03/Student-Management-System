"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const roleGuard_1 = require("../../utils/roleGuard");
const role_enum_1 = require("../../enums/role.enum");
const admin_controller_1 = require("../../controllers/admin/admin.controller");
const adminRoutes = (0, express_1.Router)();
/* ================= USER ROLES ================= */
adminRoutes.patch("/users/:userId/role", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_USERS]), admin_controller_1.changeUserRoleController);
/* ================= STUDENTS ================= */
adminRoutes.post("/students", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_STUDENTS]), admin_controller_1.createStudentController);
adminRoutes.get("/students", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_STUDENTS]), admin_controller_1.getAllStudentsController);
adminRoutes.get("/students/:studentId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_STUDENTS]), admin_controller_1.getStudentByIdController);
adminRoutes.put("/students/:studentId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_STUDENTS]), admin_controller_1.updateStudentController);
adminRoutes.delete("/students/:studentId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_STUDENTS]), admin_controller_1.deleteStudentController);
/* ================= TEACHERS ================= */
adminRoutes.post("/teachers", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_TEACHERS]), admin_controller_1.createTeacherController);
adminRoutes.get("/teachers", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_TEACHERS]), admin_controller_1.getAllTeachersController);
adminRoutes.get("/teachers/:teacherId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_TEACHERS]), admin_controller_1.getTeacherByIdController);
adminRoutes.put("/teachers/:teacherId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_TEACHERS]), admin_controller_1.updateTeacherController);
adminRoutes.delete("/teachers/:teacherId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_TEACHERS]), admin_controller_1.deleteTeacherController);
/* ================= COURSES ================= */
adminRoutes.post("/courses", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_COURSES]), admin_controller_1.createCourseController);
adminRoutes.get("/courses", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_COURSES]), admin_controller_1.getAllCoursesController);
adminRoutes.get("/courses/:courseId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_COURSES]), admin_controller_1.getCourseByIdController);
adminRoutes.put("/courses/:courseId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_COURSES]), admin_controller_1.updateCourseController);
adminRoutes.delete("/courses/:courseId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_COURSES]), admin_controller_1.deleteCourseController);
/**
 * ======================================================
 * ADMIN → DEPARTMENTS (CRUD)
 * ======================================================
 */
adminRoutes.post("/department", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), // or MANAGE_DEPARTMENTS if you add it
admin_controller_1.createDepartmentController);
adminRoutes.get("/department", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.getAllDepartmentsController);
adminRoutes.get("/department/:departmentId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.getDepartmentByIdController);
adminRoutes.put("/department/:departmentId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.updateDepartmentController);
adminRoutes.delete("/department/:departmentId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.deleteDepartmentController);
/* ================= GROUPS ================= */
adminRoutes.post("/groups", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.createGroupController);
adminRoutes.get("/groups", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.getAllGroupsController);
adminRoutes.get("/groups/:groupId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.getGroupByIdController);
adminRoutes.put("/groups/:groupId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.updateGroupController);
adminRoutes.delete("/groups/:groupId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_CLASSES]), admin_controller_1.deleteGroupController);
/* ================= FEES ================= */
adminRoutes.post("/fees", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_FEES]), admin_controller_1.createFeeController);
adminRoutes.get("/fees", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_FEES]), admin_controller_1.getAllFeesController);
adminRoutes.get("/fees/:feeId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_FEES]), admin_controller_1.getFeeByIdController);
adminRoutes.put("/fees/:feeId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_FEES]), admin_controller_1.updateFeeController);
adminRoutes.delete("/fees/:feeId", auth_middleware_1.authMiddleware, (0, roleGuard_1.roleGuard)([role_enum_1.Permissions.MANAGE_FEES]), admin_controller_1.deleteFeeController);
exports.default = adminRoutes;
//# sourceMappingURL=admin.route.js.map