import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleGuard } from "../../utils/roleGuard";
import { Permissions } from "../../enums/role.enum";

import {
  // STUDENTS
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,

  // TEACHERS
  createTeacherController,
  getAllTeachersController,
  getTeacherByIdController,
  updateTeacherController,
  deleteTeacherController,

  // USERS
  changeUserRoleController,

  // COURSES
  createCourseController,
  getAllCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,

  // GROUPS
  createGroupController,
  getAllGroupsController,
  getGroupByIdController,
  updateGroupController,
  deleteGroupController,

  // Department
  createDepartmentController,
  getAllDepartmentsController,
  getDepartmentByIdController,
  updateDepartmentController,
  deleteDepartmentController,

  // FEES
  createFeeController,
  getAllFeesController,
  getFeeByIdController,
  updateFeeController,
  deleteFeeController,
} from "../../controllers/admin/admin.controller";

const adminRoutes = Router();

/* ================= USER ROLES ================= */

adminRoutes.patch(
  "/users/:userId/role",
  authMiddleware,
  roleGuard([Permissions.MANAGE_USERS]),
  changeUserRoleController
);

/* ================= STUDENTS ================= */

adminRoutes.post(
  "/students",
  authMiddleware,
  roleGuard([Permissions.MANAGE_STUDENTS]),
  createStudentController
);

adminRoutes.get(
  "/students",
  authMiddleware,
  roleGuard([Permissions.MANAGE_STUDENTS]),
  getAllStudentsController
);

adminRoutes.get(
  "/students/:studentId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_STUDENTS]),
  getStudentByIdController
);

adminRoutes.put(
  "/students/:studentId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_STUDENTS]),
  updateStudentController
);

adminRoutes.delete(
  "/students/:studentId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_STUDENTS]),
  deleteStudentController
);

/* ================= TEACHERS ================= */

adminRoutes.post(
  "/teachers",
  authMiddleware,
  roleGuard([Permissions.MANAGE_TEACHERS]),
  createTeacherController
);

adminRoutes.get(
  "/teachers",
  authMiddleware,
  roleGuard([Permissions.MANAGE_TEACHERS]),
  getAllTeachersController
);

adminRoutes.get(
  "/teachers/:teacherId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_TEACHERS]),
  getTeacherByIdController
);

adminRoutes.put(
  "/teachers/:teacherId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_TEACHERS]),
  updateTeacherController
);

adminRoutes.delete(
  "/teachers/:teacherId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_TEACHERS]),
  deleteTeacherController
);

/* ================= COURSES ================= */

adminRoutes.post(
  "/courses",
  authMiddleware,
  roleGuard([Permissions.MANAGE_COURSES]),
  createCourseController
);

adminRoutes.get(
  "/courses",
  authMiddleware,
  roleGuard([Permissions.MANAGE_COURSES]),
  getAllCoursesController
);

adminRoutes.get(
  "/courses/:courseId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_COURSES]),
  getCourseByIdController
);

adminRoutes.put(
  "/courses/:courseId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_COURSES]),
  updateCourseController
);

adminRoutes.delete(
  "/courses/:courseId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_COURSES]),
  deleteCourseController
);

/**
 * ======================================================
 * ADMIN → DEPARTMENTS (CRUD)
 * ======================================================
 */

adminRoutes.post(
  "/department",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]), // or MANAGE_DEPARTMENTS if you add it
  createDepartmentController
);

adminRoutes.get(
  "/department",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  getAllDepartmentsController
);

adminRoutes.get(
  "/department/:departmentId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  getDepartmentByIdController
);

adminRoutes.put(
  "/department/:departmentId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  updateDepartmentController
);

adminRoutes.delete(
  "/department/:departmentId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  deleteDepartmentController
);

/* ================= GROUPS ================= */

adminRoutes.post(
  "/groups",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  createGroupController
);

adminRoutes.get(
  "/groups",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  getAllGroupsController
);

adminRoutes.get(
  "/groups/:groupId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  getGroupByIdController
);

adminRoutes.put(
  "/groups/:groupId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  updateGroupController
);

adminRoutes.delete(
  "/groups/:groupId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_CLASSES]),
  deleteGroupController
);

/* ================= FEES ================= */

adminRoutes.post(
  "/fees",
  authMiddleware,
  roleGuard([Permissions.MANAGE_FEES]),
  createFeeController
);

adminRoutes.get(
  "/fees",
  authMiddleware,
  roleGuard([Permissions.MANAGE_FEES]),
  getAllFeesController
);

adminRoutes.get(
  "/fees/:feeId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_FEES]),
  getFeeByIdController
);

adminRoutes.put(
  "/fees/:feeId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_FEES]),
  updateFeeController
);

adminRoutes.delete(
  "/fees/:feeId",
  authMiddleware,
  roleGuard([Permissions.MANAGE_FEES]),
  deleteFeeController
);

export default adminRoutes;
