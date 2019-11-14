import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { StudentListData } from './StudentList';

interface AddStudentRecordState {
    title: string;
    loading: boolean;
    studentList: StudentListData;
}


export class AddStudent extends React.Component<RouteComponentProps<{}>, AddStudentRecordState> {
    constructor(props) {
        super(props);

        //here we are intializing the interface's fields with default values.
        this.state = { title: "", loading: true, studentList: new StudentListData };

        //the studentid variable will get the student id from URL.
        var studentid = this.props.match.params["studentid"];

        //if studentid is greater than 0 then fetch method will get the specific student record and display it as in edit mode.
        if (studentid > 0) {
            fetch('api/Student/Details/' + studentid)
                .then(response => response.json() as Promise<StudentListData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, studentList: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, studentList: new StudentListData };
        }

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }
    //this method will render html onto the DOM.
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Student</h3>
            <hr />
            {contents}
        </div>;
    }



    //this method will save the record into database. If the URL has an StudentId, 
    //then it will update the record and if the URL has not student Id parameter than it will save the record.
    private FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.studentList.studentId) {
            fetch('api/Student/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/studentList");
                })
        }
        else {
            fetch('api/Student/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/studentList");
                })
        }
    }


    private FuncCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/studentList");
    }

    //this method will return the html table to display all the student record with edit and delete methods.
    private renderCreateForm() {
        return (
            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="StudentId" value={this.state.studentList.studentId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Name" defaultValue={this.state.studentList.name} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="address" >Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Address" defaultValue={this.state.studentList.address} required />
                    </div>
                </div>


                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Country" >Country</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Country" defaultValue={this.state.studentList.country} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="PhoneNo" >Phone No</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="PhoneNo" defaultValue={this.state.studentList.phoneNo} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.FuncCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}