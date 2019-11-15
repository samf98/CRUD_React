using System;
using System.Collections.Generic;

namespace CrudWithReactAspNetCore.Models
{
    public partial class Students
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Country { get; set; }
    }
}
