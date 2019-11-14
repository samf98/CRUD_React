using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudWithReactAspNetCore.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CrudWithReactAspNetCore.Controllers
{

    public class StudentController : Controller
    {
        StudentDAL obj = new StudentDAL();

        [HttpGet]
        [Route("api/Student/Index")]
        public IEnumerable<Students> Index()
        {
            return obj.GetAllStudents();
        }
        [HttpPost]
        [Route("api/Student/Create")]
        public int Create(Students student)
        {
            return obj.CreateStudent(student);
        }
        [HttpGet]
        [Route("api/Student/Details/{id}")]
        public Students Details(int id)
        {
            return obj.GetStudentData(id);
        }
        [HttpPut]
        [Route("api/Student/Edit")]
        public int Edit(Students student)
        {
            return obj.UpdateStudent(student);
        }
        [HttpDelete]
        [Route("api/Student/Delete/{id}")]
        public int Delete(int id)
        {
            return obj.DeleteStudent(id);
        }
    }
}