/*
  Warnings:

  - You are about to drop the column `attendance_date` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `session_id` on table `Attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_session_id_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_class_id_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "attendance_date",
DROP COLUMN "course_id",
ALTER COLUMN "session_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "class_id",
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "level" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3),
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "language" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "department";

-- DropTable
DROP TABLE "Class";

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("session_id") ON DELETE CASCADE ON UPDATE CASCADE;
