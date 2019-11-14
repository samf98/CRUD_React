import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';


interface StudentRecordState {
    studentListData: StudentListData[];
    loading: boolean;
}

//here declaring the StudentList class. And this StudentList class inherits the abstract class React.Component
export class StudentList extends React.Component<RouteComponentProps<{}>, StudentRecordState> {

    //Declaring the constructor 
    constructor() {

        //here we are calling base class constructor using super()
        super();

        //here we are intializing the interface's fields using default values.
        this.state = { studentListData: [], loading: true };

        //this fetch method is responsible to get all the student record using web api.
        fetch('api/Student/Index')
            .then(response => response.json() as Promise<StudentListData[]>)
            .then(data => {
                debugger
                this.setState({ studentListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }


    //this method will render html onto the DOM.
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStudentTable(this.state.studentListData);//this renderStudentTable method will return the HTML table. This table will display all the record.
        return <div>
            <h1>Student Record</h1>
            <p>
                <Link to="/addStudent">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    // this method will be responsible for deleting the student record.
    private FuncDelete(id: number) {
        if (!confirm("Do you want to delete student with this Id: " + id))
            return;
        else {
            //this fetch method will get the specific student record using student id.
            fetch('api/Student/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        studentListData: this.state.studentListData.filter((rec) => {
                            return (rec.studentId != id);
                        })
                    });
            });
        }
    }

    //this method will responsible for editing the specific student record.
    private FuncEdit(id: number) {
        this.props.history.push("/student/edit/" + id);
    }

    //this method will return the html table to display all the student record with edit and delete methods.
    private renderStudentTable(studentListData: StudentListData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>Phone No</th>
                </tr>
            </thead>
            <tbody>
                {studentListData.map(item =>
                    <tr key={item.studentId}>
                        <td >{item.name}</td>
                        <td >{item.address}</td>
                        <td >{item.country}</td>
                        <td >{item.phoneNo}</td>
                        <td >
                            <a className="action" onClick={(id) => this.FuncEdit(item.studentId)}>Edit</a>|
                            <a className="action" onClick={(id) => this.FuncDelete(item.studentId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

//here we are declaring a class which have the same properties as we have in model class.
export class StudentListData {
    studentId: number = 0;
    name: string = "";
    address: string = "";
    country: string = "";
    phoneNo: string = "";
}