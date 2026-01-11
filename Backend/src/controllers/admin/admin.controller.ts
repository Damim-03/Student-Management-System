import { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import { Roles, RoleType } from "../../enums/role.enum";
import { JwtUser } from "../../middlewares/auth.middleware";

/* ================= STUDENTS ================= */

export const createStudentController = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    nationality,
    language,
    education_level,
    study_location,
  } = req.body;

  if (!first_name?.trim() || !last_name?.trim()) {
    return res.status(400).json({
      message: "first_name and last_name are required",
    });
  }

  if (email) {
    const exists = await prisma.student.findFirst({ where: { email } });
    if (exists) {
      return res.status(409).json({
        message: "Student with this email already exists",
      });
    }
  }

  const student = await prisma.student.create({
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

export const getAllStudentsController = async (_: Request, res: Response) => {
  return res.json(
    await prisma.student.findMany({
      include: {
        group: true,
        enrollments: { include: { course: true } },
      },
    })
  );
};

export const getStudentByIdController = async (req: Request, res: Response) => {
  const student = await prisma.student.findUnique({
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

export const updateStudentController = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }

  const exists = await prisma.student.findUnique({
    where: { student_id: req.params.studentId },
  });

  if (!exists) {
    return res.status(404).json({ message: "Student not found" });
  }

  const student = await prisma.student.update({
    where: { student_id: req.params.studentId },
    data: req.body,
  });

  return res.json(student);
};

export const deleteStudentController = async (req: Request, res: Response) => {
  await prisma.student.delete({
    where: { student_id: req.params.studentId },
  });

  return res.json({ message: "Student deleted successfully" });
};

/* ================= TEACHERS ================= */

export const createTeacherController = async (req: Request, res: Response) => {
  if (!req.body.first_name || !req.body.last_name) {
    return res.status(400).json({
      message: "first_name and last_name are required",
    });
  }

  const teacher = await prisma.teacher.create({ data: req.body });
  return res.status(201).json(teacher);
};

export const getAllTeachersController = async (_: Request, res: Response) => {
  return res.json(await prisma.teacher.findMany());
};

export const getTeacherByIdController = async (req: Request, res: Response) => {
  const teacher = await prisma.teacher.findUnique({
    where: { teacher_id: req.params.teacherId },
  });

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  return res.json(teacher);
};

export const updateTeacherController = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }

  const teacher = await prisma.teacher.update({
    where: { teacher_id: req.params.teacherId },
    data: req.body,
  });

  return res.json(teacher);
};

export const deleteTeacherController = async (req: Request, res: Response) => {
  await prisma.teacher.delete({
    where: { teacher_id: req.params.teacherId },
  });

  return res.json({ message: "Teacher deleted successfully" });
};

/* ================= USER ROLES ================= */

export const changeUserRoleController = async (req: Request, res: Response) => {
  const { role } = req.body as { role: RoleType };
  const admin = (req as Request & { user?: JwtUser }).user;

  if (!Object.values(Roles).includes(role)) {
    return res.status(400).json({ message: "Invalid role value" });
  }

  if (admin?.user_id === req.params.userId) {
    return res.status(403).json({
      message: "You cannot change your own role",
    });
  }

  const user = await prisma.user.findUnique({
    where: { user_id: req.params.userId },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updated = await prisma.user.update({
    where: { user_id: req.params.userId },
    data: { role },
  });

  return res.json(updated);
};

/* ================= COURSES ================= */

export const createCourseController = async (req: Request, res: Response) => {
  if (!req.body.course_name?.trim()) {
    return res.status(400).json({
      message: "course_name is required",
    });
  }

  const course = await prisma.course.create({ data: req.body });
  return res.status(201).json(course);
};

export const getAllCoursesController = async (_: Request, res: Response) => {
  return res.json(await prisma.course.findMany({ include: { teacher: true } }));
};

export const getCourseByIdController = async (req: Request, res: Response) => {
  const course = await prisma.course.findUnique({
    where: { course_id: req.params.courseId },
    include: { teacher: true },
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  return res.json(course);
};

export const updateCourseController = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }

  const course = await prisma.course.update({
    where: { course_id: req.params.courseId },
    data: req.body,
  });

  return res.json(course);
};

export const deleteCourseController = async (req: Request, res: Response) => {
  await prisma.course.delete({
    where: { course_id: req.params.courseId },
  });

  return res.json({ message: "Course deleted successfully" });
};

/* ================= DEPARTMENTS ================= */

/**
 * CREATE DEPARTMENT
 */
export const createDepartmentController = async (
  req: Request,
  res: Response
) => {
  const { name, description } = req.body;

  // 1️⃣ Validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Department name is required and must be at least 2 characters",
    });
  }

  // 2️⃣ Unique check (schema: name @unique)
  const exists = await prisma.department.findUnique({
    where: { name: name.trim() },
  });

  if (exists) {
    return res.status(409).json({
      message: "Department with this name already exists",
    });
  }

  // 3️⃣ Create
  const department = await prisma.department.create({
    data: {
      name: name.trim(),
      description: description?.trim() || null,
    },
  });

  return res.status(201).json(department);
};

/**
 * GET ALL DEPARTMENTS
 */
export const getAllDepartmentsController = async (
  _: Request,
  res: Response
) => {
  const departments = await prisma.department.findMany({
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

/**
 * GET DEPARTMENT BY ID
 */
export const getDepartmentByIdController = async (
  req: Request,
  res: Response
) => {
  const { departmentId } = req.params;

  // 1️⃣ Validate UUID
  if (!departmentId) {
    return res.status(400).json({ message: "departmentId is required" });
  }

  const department = await prisma.department.findUnique({
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

/**
 * UPDATE DEPARTMENT
 */
export const updateDepartmentController = async (
  req: Request,
  res: Response
) => {
  const { departmentId } = req.params;
  const { name, description } = req.body;

  // 1️⃣ Check existence
  const exists = await prisma.department.findUnique({
    where: { department_id: departmentId },
  });

  if (!exists) {
    return res.status(404).json({
      message: "Department not found",
    });
  }

  // 2️⃣ Prevent duplicate name
  if (name && name !== exists.name) {
    const duplicate = await prisma.department.findUnique({
      where: { name },
    });

    if (duplicate) {
      return res.status(409).json({
        message: "Another department with this name already exists",
      });
    }
  }

  // 3️⃣ Update safely
  const department = await prisma.department.update({
    where: { department_id: departmentId },
    data: {
      name: name?.trim(),
      description: description?.trim(),
    },
  });

  return res.json(department);
};

/**
 * DELETE DEPARTMENT
 */
export const deleteDepartmentController = async (
  req: Request,
  res: Response
) => {
  const { departmentId } = req.params;

  // 1️⃣ Check existence
  const department = await prisma.department.findUnique({
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
      message:
        "Cannot delete department with existing groups. Remove groups first.",
    });
  }

  // 3️⃣ Delete
  await prisma.department.delete({
    where: { department_id: departmentId },
  });

  return res.json({
    message: "Department deleted successfully",
  });
};

/* ================= GROUPS ================= */

export const createGroupController = async (req: Request, res: Response) => {
  const { name, department_id } = req.body;

  if (!name?.trim() || !department_id) {
    return res.status(400).json({
      message: "name and department_id are required",
    });
  }

  const departmentExists = await prisma.department.findUnique({
    where: { department_id },
  });

  if (!departmentExists) {
    return res.status(400).json({
      message: "Invalid department_id",
    });
  }

  const group = await prisma.group.create({ data: req.body });
  return res.status(201).json(group);
};

export const getAllGroupsController = async (_: Request, res: Response) => {
  return res.json(
    await prisma.group.findMany({
      include: { department: true, students: true },
    })
  );
};

export const getGroupByIdController = async (req: Request, res: Response) => {
  const group = await prisma.group.findUnique({
    where: { group_id: req.params.groupId },
    include: { department: true, students: true },
  });

  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  return res.json(group);
};

export const updateGroupController = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }

  const group = await prisma.group.update({
    where: { group_id: req.params.groupId },
    data: req.body,
  });

  return res.json(group);
};

export const deleteGroupController = async (req: Request, res: Response) => {
  await prisma.group.delete({
    where: { group_id: req.params.groupId },
  });

  return res.json({ message: "Group deleted successfully" });
};

/* ================= FEES ================= */

export const createFeeController = async (req: Request, res: Response) => {
  const { student_id, amount, due_date } = req.body;

  if (!student_id || !amount || !due_date) {
    return res.status(400).json({
      message: "student_id, amount and due_date are required",
    });
  }

  const studentExists = await prisma.student.findUnique({
    where: { student_id },
  });

  if (!studentExists) {
    return res.status(400).json({
      message: "Invalid student_id",
    });
  }

  const fee = await prisma.fee.create({ data: req.body });
  return res.status(201).json(fee);
};

export const getAllFeesController = async (_: Request, res: Response) => {
  return res.json(await prisma.fee.findMany({ include: { student: true } }));
};

export const getFeeByIdController = async (req: Request, res: Response) => {
  const fee = await prisma.fee.findUnique({
    where: { fee_id: req.params.feeId },
    include: { student: true },
  });

  if (!fee) {
    return res.status(404).json({ message: "Fee not found" });
  }

  return res.json(fee);
};

export const updateFeeController = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }

  const fee = await prisma.fee.update({
    where: { fee_id: req.params.feeId },
    data: req.body,
  });

  return res.json(fee);
};

export const deleteFeeController = async (req: Request, res: Response) => {
  await prisma.fee.delete({
    where: { fee_id: req.params.feeId },
  });

  return res.json({ message: "Fee deleted successfully" });
};
