"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./components/Home");
var StudentList_1 = require("./components/StudentList");
var AddNewStudent_1 = require("./components/AddNewStudent");
exports.routes = React.createElement(Layout_1.Layout, null,
    React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: Home_1.Home }),
    React.createElement(react_router_dom_1.Route, { path: '/studentList', component: StudentList_1.StudentList }),
    React.createElement(react_router_dom_1.Route, { path: '/addStudent', component: AddNewStudent_1.AddStudent }),
    React.createElement(react_router_dom_1.Route, { path: '/student/edit/:studentid', component: AddNewStudent_1.AddStudent }));
//# sourceMappingURL=routes.js.map