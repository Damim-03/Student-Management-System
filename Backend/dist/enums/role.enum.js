"use strict";
/**
 * Roles & Permissions for Student Management System
 * -------------------------------------------------
 * Roles = WHO the user is
 * Permissions = WHAT the user can do
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.Permissions = exports.Roles = void 0;
exports.Roles = {
    ADMIN: "ADMIN", // System administrator
    TEACHER: "TEACHER", // Teacher / Instructor
    STUDENT: "STUDENT", // Student / Learner
};
/**
 * Permissions
 */
exports.Permissions = {
    // ===== STUDENT PERMISSIONS =====
    VIEW_OWN_PROFILE: "VIEW_OWN_PROFILE",
    EDIT_OWN_PROFILE: "EDIT_OWN_PROFILE",
    VIEW_OWN_COURSES: "VIEW_OWN_COURSES",
    VIEW_OWN_ATTENDANCE: "VIEW_OWN_ATTENDANCE",
    VIEW_OWN_RESULTS: "VIEW_OWN_RESULTS",
    VIEW_OWN_FEES: "VIEW_OWN_FEES",
    // ===== TEACHER PERMISSIONS =====
    VIEW_ASSIGNED_COURSES: "VIEW_ASSIGNED_COURSES",
    MANAGE_ATTENDANCE: "MANAGE_ATTENDANCE",
    CREATE_EXAMS: "CREATE_EXAMS",
    UPDATE_EXAMS: "UPDATE_EXAMS",
    ENTER_RESULTS: "ENTER_RESULTS",
    VIEW_STUDENTS: "VIEW_STUDENTS",
    // ===== ADMIN PERMISSIONS =====
    MANAGE_USERS: "MANAGE_USERS",
    MANAGE_STUDENTS: "MANAGE_STUDENTS",
    MANAGE_TEACHERS: "MANAGE_TEACHERS",
    MANAGE_COURSES: "MANAGE_COURSES",
    MANAGE_CLASSES: "MANAGE_CLASSES",
    MANAGE_FEES: "MANAGE_FEES",
    MANAGE_PERMISSIONS: "MANAGE_PERMISSIONS",
    VIEW_REPORTS: "VIEW_REPORTS",
};
/**
 * Role → Permission mapping
 */
exports.RolePermissions = {
    ADMIN: [
        exports.Permissions.MANAGE_USERS,
        exports.Permissions.MANAGE_STUDENTS,
        exports.Permissions.MANAGE_TEACHERS,
        exports.Permissions.MANAGE_COURSES,
        exports.Permissions.MANAGE_CLASSES,
        exports.Permissions.MANAGE_FEES,
        exports.Permissions.MANAGE_PERMISSIONS,
        exports.Permissions.VIEW_REPORTS,
    ],
    TEACHER: [
        exports.Permissions.VIEW_ASSIGNED_COURSES,
        exports.Permissions.MANAGE_ATTENDANCE,
        exports.Permissions.CREATE_EXAMS,
        exports.Permissions.UPDATE_EXAMS,
        exports.Permissions.ENTER_RESULTS,
        exports.Permissions.VIEW_STUDENTS,
    ],
    STUDENT: [
        exports.Permissions.VIEW_OWN_PROFILE,
        exports.Permissions.EDIT_OWN_PROFILE,
        exports.Permissions.VIEW_OWN_COURSES,
        exports.Permissions.VIEW_OWN_ATTENDANCE,
        exports.Permissions.VIEW_OWN_RESULTS,
        exports.Permissions.VIEW_OWN_FEES,
    ],
};
//# sourceMappingURL=role.enum.js.map