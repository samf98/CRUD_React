"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
//here declaring the StudentList class. And this StudentList class inherits the abstract class React.Component
var StudentList = /** @class */ (function (_super) {
    __extends(StudentList, _super);
    //Declaring the constructor 
    function StudentList(props) {
        var _this = 
        //here we are calling base class constructor using super()
        _super.call(this, props) || this;
        //here we are intializing the interface's fields using default values.
        _this.state = { studentListData: [], loading: true };
        //this fetch method is responsible to get all the student record using web api.
        fetch('api/Student/Index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            debugger;
            _this.setState({ studentListData: data, loading: false });
        });
        _this.FuncDelete = _this.FuncDelete.bind(_this);
        _this.FuncEdit = _this.FuncEdit.bind(_this);
        return _this;
    }
    //this method will render html onto the DOM.
    StudentList.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderStudentTable(this.state.studentListData); //this renderStudentTable method will return the HTML table. This table will display all the record.
        return React.createElement("div", null,
            React.createElement("h1", null, "Student Record"),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addStudent" }, "Create New")),
            contents);
    };
    // this method will be responsible for deleting the student record.
    StudentList.prototype.FuncDelete = function (id) {
        var _this = this;
        if (!confirm("Do you want to delete student with this Id: " + id))
            return;
        else {
            //this fetch method will get the specific student record using student id.
            fetch('api/Student/Delete/' + id, {
                method: 'delete'
            }).then(function (data) {
                _this.setState({
                    studentListData: _this.state.studentListData.filter(function (rec) {
                        return (rec.studentId != id);
                    })
                });
            });
        }
    };
    //this method will responsible for editing the specific student record.
    StudentList.prototype.FuncEdit = function (id) {
        this.props.history.push("/student/edit/" + id);
    };
    //this method will return the html table to display all the student record with edit and delete methods.
    StudentList.prototype.renderStudentTable = function (studentListData) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Address"),
                    React.createElement("th", null, "Country"),
                    React.createElement("th", null, "Phone No"))),
            React.createElement("tbody", null, studentListData.map(function (item) {
                return React.createElement("tr", { key: item.studentId },
                    React.createElement("td", null, item.name),
                    React.createElement("td", null, item.address),
                    React.createElement("td", null, item.country),
                    React.createElement("td", null, item.phoneNo),
                    React.createElement("td", null,
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.FuncEdit(item.studentId); } }, "Edit"),
                        "|",
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.FuncDelete(item.studentId); } }, "Delete")));
            })));
    };
    return StudentList;
}(React.Component));
exports.StudentList = StudentList;
//here we are declaring a class which have the same properties as we have in model class.
var StudentListData = /** @class */ (function () {
    function StudentListData() {
        this.studentId = 0;
        this.name = "";
        this.address = "";
        this.country = "";
        this.phoneNo = "";
    }
    return StudentListData;
}());
exports.StudentListData = StudentListData;
//# sourceMappingURL=StudentList.js.map