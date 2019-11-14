using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudWithReactAspNetCore.Models
{
    public class StudentDAL
    {
        Student_DbContext db = new Student_DbContext();

        //this method will get all the student record
        public IEnumerable<Students> GetAllStudents()
        {
            return db.Students.ToList();
        }

        //this method will add a new student 
        public int CreateStudent(Students student)
        {
            db.Students.Add(student);
            db.SaveChanges();
            return 1;

        }
        //this method will update the existing student record    
        public int UpdateStudent(Students student)
        {
            db.Entry(student).State = EntityState.Modified;
            db.SaveChanges();
            return 1;
        }
        //this method will get detail of a specific student
        public Students GetStudentData(int id)
        {
            Students student = db.Students.Find(id);
            return student;
        }
        //this method will delete the specifig student record    
        public int DeleteStudent(int id)
        {
            Students emp = db.Students.Find(id);
            db.Students.Remove(emp);
            db.SaveChanges();
            return 1;
        }

    }
}