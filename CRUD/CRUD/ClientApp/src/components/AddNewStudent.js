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
var StudentList_1 = require("./StudentList");
var AddStudent = /** @class */ (function (_super) {
    __extends(AddStudent, _super);
    function AddStudent(props) {
        var _this = _super.call(this, props) || this;
        //here we are intializing the interface's fields with default values.
        _this.state = { title: "", loading: true, studentList: new StudentList_1.StudentListData };
        //the studentid variable will get the student id from URL.
        var studentid = _this.props.match.params["studentid"];
        //if studentid is greater than 0 then fetch method will get the specific student record and display it as in edit mode.
        if (studentid > 0) {
            fetch('api/Student/Details/' + studentid)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "Edit", loading: false, studentList: data });
            });
        }
        else {
            _this.state = { title: "Create", loading: false, studentList: new StudentList_1.StudentListData };
        }
        _this.FuncSave = _this.FuncSave.bind(_this);
        _this.FuncCancel = _this.FuncCancel.bind(_this);
        return _this;
    }
    //this method will render html onto the DOM.
    AddStudent.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm();
        return React.createElement("div", null,
            React.createElement("h1", null, this.state.title),
            React.createElement("h3", null, "Student"),
            React.createElement("hr", null),
            contents);
    };
    //this method will save the record into database. If the URL has an StudentId, 
    //then it will update the record and if the URL has not student Id parameter than it will save the record.
    AddStudent.prototype.FuncSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.studentList.studentId) {
            fetch('api/Student/Edit', {
                method: 'PUT',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/studentList");
            });
        }
        else {
            fetch('api/Student/Create', {
                method: 'POST',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/studentList");
            });
        }
    };
    AddStudent.prototype.FuncCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/studentList");
    };
    //this method will return the html table to display all the student record with edit and delete methods.
    AddStudent.prototype.renderCreateForm = function () {
        return (React.createElement("form", { onSubmit: this.FuncSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "StudentId", value: this.state.studentList.studentId })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "name" }, "Name"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Name", defaultValue: this.state.studentList.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "address" }, "Address"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Address", defaultValue: this.state.studentList.address, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Country" }, "Country"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Country", defaultValue: this.state.studentList.country, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "PhoneNo" }, "Phone No"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "PhoneNo", defaultValue: this.state.studentList.phoneNo, required: true }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Save"),
                React.createElement("button", { className: "btn", onClick: this.FuncCancel }, "Cancel"))));
    };
    return AddStudent;
}(React.Component));
exports.AddStudent = AddStudent;
//# sourceMappingURL=AddNewStudent.js.map