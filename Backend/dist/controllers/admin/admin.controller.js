"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeeController = exports.updateFeeController = exports.getFeeByIdController = exports.getAllFeesController = exports.createFeeController = exports.deleteGroupController = exports.updateGroupController = exports.getGroupByIdController = exports.getAllGroupsController = exports.createGroupController = exports.deleteDepartmentController = exports.updateDepartmentController = exports.getDepartmentByIdController = exports.getAllDepartmentsController = exports.createDepartmentController = exports.deleteCourseController = exports.updateCourseController = exports.getCourseByIdController = exports.getAllCoursesController = exports.createCourseController = exports.changeUserRoleController = exports.deleteTeacherController = exports.updateTeacherController = exports.getTeacherByIdController = exports.getAllTeachersController = exports.createTeacherController = exports.deleteStudentController = exports.updateStudentController = exports.getStudentByIdController = exports.getAllStudentsController = exports.createStudentController = void 0;
const client_1 = require("../../prisma/client");
const role_enum_1 = require("../../enums/role.enum");
/* ================= STUDENTS ================= */
const createStudentController = async (req, res) => {
    const { first_name, last_name, email, phone_number, nationality, language, education_level, study_location, } = req.body;
    if (!first_name?.trim() || !last_name?.trim()) {
        return res.status(400).json({
            message: "first_name and last_name are required",
        });
    }
    if (email) {
        const exists = await client_1.prisma.student.findFirst({ where: { email } });
        if (exists) {
            return res.status(409).json({
                message: "Student with this email already exists",
            });
        }
    }
    const student = await client_1.prisma.student.create({
        data: {
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email,
            phone_number,
            nationality,
            language,
            education_level,
            study_location,
        },
    });
    return res.status(201).json(student);
};
exports.createStudentController = createStudentController;
const getAllStudentsController = async (_, res) => {
    return res.json(await client_1.prisma.student.findMany({
        include: {
            group: true,
            enrollments: { include: { course: true } },
        },
    }));
};
exports.getAllStudentsController = getAllStudentsController;
const getStudentByIdController = async (req, res) => {
    const student = await client_1.prisma.student.findUnique({
        where: { student_id: req.params.studentId },
        include: {
            group: true,
            enrollments: true,
            attendance: true,
            fees: true,
        },
    });
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    return res.json(student);
};
exports.getStudentByIdController = getStudentByIdController;
const updateStudentController = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty" });
    }
    const exists = await client_1.prisma.student.findUnique({
        where: { student_id: req.params.studentId },
    });
    if (!exists) {
        return res.status(404).json({ message: "Student not found" });
    }
    const student = await client_1.prisma.student.update({
        where: { student_id: req.params.studentId },
        data: req.body,
    });
    return res.json(student);
};
exports.updateStudentController = updateStudentController;
const deleteStudentController = async (req, res) => {
    await client_1.prisma.student.delete({
        where: { student_id: req.params.studentId },
    });
    return res.json({ message: "Student deleted successfully" });
};
exports.deleteStudentController = deleteStudentController;
/* ================= TEACHERS ================= */
const createTeacherController = async (req, res) => {
    if (!req.body.first_name || !req.body.last_name) {
        return res.status(400).json({
            message: "first_name and last_name are required",
        });
    }
    const teacher = await client_1.prisma.teacher.create({ data: req.body });
    return res.status(201).json(teacher);
};
exports.createTeacherController = createTeacherController;
const getAllTeachersController = async (_, res) => {
    return res.json(await client_1.prisma.teacher.findMany());
};
exports.getAllTeachersController = getAllTeachersController;
const getTeacherByIdController = async (req, res) => {
    const teacher = await client_1.prisma.teacher.findUnique({
        where: { teacher_id: req.params.teacherId },
    });
    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json(teacher);
};
exports.getTeacherByIdController = getTeacherByIdController;
const updateTeacherController = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty" });
    }
    const teacher = await client_1.prisma.teacher.update({
        where: { teacher_id: req.params.teacherId },
        data: req.body,
    });
    return res.json(teacher);
};
exports.updateTeacherController = updateTeacherController;
const deleteTeacherController = async (req, res) => {
    await client_1.prisma.teacher.delete({
        where: { teacher_id: req.params.teacherId },
    });
    return res.json({ message: "Teacher deleted successfully" });
};
exports.deleteTeacherController = deleteTeacherController;
/* ================= USER ROLES ================= */
const changeUserRoleController = async (req, res) => {
    const { role } = req.body;
    const admin = req.user;
    if (!Object.values(role_enum_1.Roles).includes(role)) {
        return res.status(400).json({ message: "Invalid role value" });
    }
    if (admin?.user_id === req.params.userId) {
        return res.status(403).json({
            message: "You cannot change your own role",
        });
    }
    const user = await client_1.prisma.user.findUnique({
        where: { user_id: req.params.userId },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const updated = await client_1.prisma.user.update({
        where: { user_id: req.params.userId },
        data: { role },
    });
    return res.json(updated);
};
exports.changeUserRoleController = changeUserRoleController;
/* ================= COURSES ================= */
const createCourseController = async (req, res) => {
    if (!req.body.course_name?.trim()) {
        return res.status(400).json({
            message: "course_name is required",
        });
    }
    const course = await client_1.prisma.course.create({ data: req.body });
    return res.status(201).json(course);
};
exports.createCourseController = createCourseController;
const getAllCoursesController = async (_, res) => {
    return res.json(await client_1.prisma.course.findMany({ include: { teacher: true } }));
};
exports.getAllCoursesController = getAllCoursesController;
const getCourseByIdController = async (req, res) => {
    const course = await client_1.prisma.course.findUnique({
        where: { course_id: req.params.courseId },
        include: { teacher: true },
    });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    return res.json(course);
};
exports.getCourseByIdController = getCourseByIdController;
const updateCourseController = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty" });
    }
    const course = await client_1.prisma.course.update({
        where: { course_id: req.params.courseId },
        data: req.body,
    });
    return res.json(course);
};
exports.updateCourseController = updateCourseController;
const deleteCourseController = async (req, res) => {
    await client_1.prisma.course.delete({
        where: { course_id: req.params.courseId },
    });
    return res.json({ message: "Course deleted successfully" });
};
exports.deleteCourseController = deleteCourseController;
/* ================= DEPARTMENTS ================= */
/**
 * CREATE DEPARTMENT
 */
const createDepartmentController = async (req, res) => {
    const { name, description } = req.body;
    // 1️⃣ Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
            message: "Department name is required and must be at least 2 characters",
        });
    }
    // 2️⃣ Unique check (schema: name @unique)
    const exists = await client_1.prisma.department.findUnique({
        where: { name: name.trim() },
    });
    if (exists) {
        return res.status(409).json({
            message: "Department with this name already exists",
        });
    }
    // 3️⃣ Create
    const department = await client_1.prisma.department.create({
        data: {
            name: name.trim(),
            description: description?.trim() || null,
        },
    });
    return res.status(201).json(department);
};
exports.createDepartmentController = createDepartmentController;
/**
 * GET ALL DEPARTMENTS
 */
const getAllDepartmentsController = async (_, res) => {
    const departments = await client_1.prisma.department.findMany({
        orderBy: { created_at: "desc" },
        include: {
            groups: {
                select: {
                    group_id: true,
                    name: true,
                    academic_year: true,
                },
            },
        },
    });
    return res.json(departments);
};
exports.getAllDepartmentsController = getAllDepartmentsController;
/**
 * GET DEPARTMENT BY ID
 */
const getDepartmentByIdController = async (req, res) => {
    const { departmentId } = req.params;
    // 1️⃣ Validate UUID
    if (!departmentId) {
        return res.status(400).json({ message: "departmentId is required" });
    }
    const department = await client_1.prisma.department.findUnique({
        where: { department_id: departmentId },
        include: {
            groups: {
                include: {
                    students: {
                        select: {
                            student_id: true,
                            first_name: true,
                            last_name: true,
                        },
                    },
                },
            },
        },
    });
    if (!department) {
        return res.status(404).json({
            message: "Department not found",
        });
    }
    return res.json(department);
};
exports.getDepartmentByIdController = getDepartmentByIdController;
/**
 * UPDATE DEPARTMENT
 */
const updateDepartmentController = async (req, res) => {
    const { departmentId } = req.params;
    const { name, description } = req.body;
    // 1️⃣ Check existence
    const exists = await client_1.prisma.department.findUnique({
        where: { department_id: departmentId },
    });
    if (!exists) {
        return res.status(404).json({
            message: "Department not found",
        });
    }
    // 2️⃣ Prevent duplicate name
    if (name && name !== exists.name) {
        const duplicate = await client_1.prisma.department.findUnique({
            where: { name },
        });
        if (duplicate) {
            return res.status(409).json({
                message: "Another department with this name already exists",
            });
        }
    }
    // 3️⃣ Update safely
    const department = await client_1.prisma.department.update({
        where: { department_id: departmentId },
        data: {
            name: name?.trim(),
            description: description?.trim(),
        },
    });
    return res.json(department);
};
exports.updateDepartmentController = updateDepartmentController;
/**
 * DELETE DEPARTMENT
 */
const deleteDepartmentController = async (req, res) => {
    const { departmentId } = req.params;
    // 1️⃣ Check existence
    const department = await client_1.prisma.department.findUnique({
        where: { department_id: departmentId },
        include: { groups: true },
    });
    if (!department) {
        return res.status(404).json({
            message: "Department not found",
        });
    }
    // 2️⃣ Business rule: prevent deleting if groups exist
    if (department.groups.length > 0) {
        return res.status(400).json({
            message: "Cannot delete department with existing groups. Remove groups first.",
        });
    }
    // 3️⃣ Delete
    await client_1.prisma.department.delete({
        where: { department_id: departmentId },
    });
    return res.json({
        message: "Department deleted successfully",
    });
};
exports.deleteDepartmentController = deleteDepartmentController;
/* ================= GROUPS ================= */
const createGroupController = async (req, res) => {
    const { name, department_id } = req.body;
    if (!name?.trim() || !department_id) {
        return res.status(400).json({
            message: "name and department_id are required",
        });
    }
    const departmentExists = await client_1.prisma.department.findUnique({
        where: { department_id },
    });
    if (!departmentExists) {
        return res.status(400).json({
            message: "Invalid department_id",
        });
    }
    const group = await client_1.prisma.group.create({ data: req.body });
    return res.status(201).json(group);
};
exports.createGroupController = createGroupController;
const getAllGroupsController = async (_, res) => {
    return res.json(await client_1.prisma.group.findMany({
        include: { department: true, students: true },
    }));
};
exports.getAllGroupsController = getAllGroupsController;
const getGroupByIdController = async (req, res) => {
    const group = await client_1.prisma.group.findUnique({
        where: { group_id: req.params.groupId },
        include: { department: true, students: true },
    });
    if (!group) {
        return res.status(404).json({ message: "Group not found" });
    }
    return res.json(group);
};
exports.getGroupByIdController = getGroupByIdController;
const updateGroupController = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty" });
    }
    const group = await client_1.prisma.group.update({
        where: { group_id: req.params.groupId },
        data: req.body,
    });
    return res.json(group);
};
exports.updateGroupController = updateGroupController;
const deleteGroupController = async (req, res) => {
    await client_1.prisma.group.delete({
        where: { group_id: req.params.groupId },
    });
    return res.json({ message: "Group deleted successfully" });
};
exports.deleteGroupController = deleteGroupController;
/* ================= FEES ================= */
const createFeeController = async (req, res) => {
    const { student_id, amount, due_date } = req.body;
    if (!student_id || !amount || !due_date) {
        return res.status(400).json({
            message: "student_id, amount and due_date are required",
        });
    }
    const studentExists = await client_1.prisma.student.findUnique({
        where: { student_id },
    });
    if (!studentExists) {
        return res.status(400).json({
            message: "Invalid student_id",
        });
    }
    const fee = await client_1.prisma.fee.create({ data: req.body });
    return res.status(201).json(fee);
};
exports.createFeeController = createFeeController;
const getAllFeesController = async (_, res) => {
    return res.json(await client_1.prisma.fee.findMany({ include: { student: true } }));
};
exports.getAllFeesController = getAllFeesController;
const getFeeByIdController = async (req, res) => {
    const fee = await client_1.prisma.fee.findUnique({
        where: { fee_id: req.params.feeId },
        include: { student: true },
    });
    if (!fee) {
        return res.status(404).json({ message: "Fee not found" });
    }
    return res.json(fee);
};
exports.getFeeByIdController = getFeeByIdController;
const updateFeeController = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty" });
    }
    const fee = await client_1.prisma.fee.update({
        where: { fee_id: req.params.feeId },
        data: req.body,
    });
    return res.json(fee);
};
exports.updateFeeController = updateFeeController;
const deleteFeeController = async (req, res) => {
    await client_1.prisma.fee.delete({
        where: { fee_id: req.params.feeId },
    });
    return res.json({ message: "Fee deleted successfully" });
};
exports.deleteFeeController = deleteFeeController;
//# sourceMappingURL=admin.controller.js.map