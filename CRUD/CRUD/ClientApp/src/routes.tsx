import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { StudentList } from './components/StudentList';
import { AddStudent } from './components/AddNewStudent';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/studentList' component={StudentList} />
    <Route path='/addStudent' component={AddStudent} />
    <Route path='/student/edit/:studentid' component={AddStudent} />
</Layout>;