-- CreateTable
CREATE TABLE "TeachersDiscipline" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "TeachersDiscipline_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeachersDiscipline" ADD CONSTRAINT "TeachersDiscipline_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
