import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import PublicRoute from './Components/PublicRoute/PublicRoute';
import { useAuthCheck } from './hooks/useAuthCheck';
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin';
import Assignment from './Pages/Admin/DashBoard/Assignment/Assignment';
import AssignmentMark from './Pages/Admin/DashBoard/AssignmentMark/AssignmentMark';
import DashBoard from './Pages/Admin/DashBoard/DashBoard';
import Quiz from './Pages/Admin/DashBoard/Quiz/Quiz';
import AddVideo from './Pages/Admin/DashBoard/Videos/AddVideo/AddVideo';
import Videos from './Pages/Admin/DashBoard/Videos/Videos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditVideo from './Pages/Admin/DashBoard/Videos/EditVideo/EditVideo';
import AddAssignment from './Pages/Admin/DashBoard/Assignment/AddAssignment/AddAssignment';
import EditAssignment from './Pages/Admin/DashBoard/Assignment/EditAssignment/EditAssignment';
import AddQuizz from './Pages/Admin/DashBoard/Quiz/AddQuizz/AddQuizz';
import EditQuiz from './Pages/Admin/DashBoard/Quiz/EditQuiz/EditQuiz';
import StudentLogin from './Pages/Student/StudentLogin/StudentLogin';
import CoursePlayer from './Pages/Student/CoursePlayer/CoursePlayer';
import LeaderBoard from './Pages/Student/LeaderBoard/LeaderBoard';
import StudentQuiz from './Pages/Student/StudentQuiz/StudentQuiz';
import Registration from './Pages/Student/Registration/Registration';
import PrivateRouteStudent from './Components/PrivateRoute/PrivateRouteStudent';
import PublicRouteStudent from './Components/PublicRoute/PublicRouteStudent';
import Modal from './Pages/Modal/Modal';

function App() {
  const authcheck = useAuthCheck();

  return !authcheck ? (<div>Checking Authentication...</div>) : (
    <div>
      <Routes>
        {/* --- Student Routes --- */}
        <Route path='/' element={<PublicRouteStudent><StudentLogin></StudentLogin></PublicRouteStudent>} ></Route>
        <Route path='/coursePlayer' element={<PrivateRouteStudent><CoursePlayer></CoursePlayer></PrivateRouteStudent>} ></Route>
        <Route path='/leaderboard' element={<PrivateRouteStudent><LeaderBoard></LeaderBoard></PrivateRouteStudent>} ></Route>
        <Route path='/quiz' element={<PrivateRouteStudent><StudentQuiz></StudentQuiz></PrivateRouteStudent>} ></Route>
        <Route path='/studentRegistration' element={<PublicRouteStudent><Registration></Registration></PublicRouteStudent>} ></Route>

        {/* --- Admin Routes --- */}
        <Route path='/admin' element={<PublicRoute><AdminLogin></AdminLogin></PublicRoute>} ></Route>
        <Route path="/admin/dashboard" element={<PrivateRoute><DashBoard></DashBoard></PrivateRoute>} ></Route>
        <Route path="/admin/videos" element={<PrivateRoute><Videos></Videos></PrivateRoute>} ></Route>
        <Route path="/admin/assignment" element={<PrivateRoute><Assignment></Assignment></PrivateRoute>} ></Route>
        <Route path="/admin/quiz" element={<PrivateRoute><Quiz></Quiz></PrivateRoute>} ></Route>
        <Route path="/admin/assignmentMark" element={<PrivateRoute><AssignmentMark></AssignmentMark></PrivateRoute>} ></Route>
        <Route path="/admin/addvideo" element={<PrivateRoute><AddVideo></AddVideo></PrivateRoute>} ></Route>
        <Route path="/admin/editVideo/:id" element={<PrivateRoute><EditVideo></EditVideo></PrivateRoute>} ></Route>
        <Route path="/admin/editAssignment/:id" element={<PrivateRoute><EditAssignment></EditAssignment></PrivateRoute>} ></Route>
        <Route path="/admin/editQuiz/:id" element={<PrivateRoute><EditQuiz></EditQuiz></PrivateRoute>} ></Route>
        <Route path="/admin/addAssignment" element={<PrivateRoute><AddAssignment></AddAssignment></PrivateRoute>} ></Route>
        <Route path="/admin/addQuizz" element={<PrivateRoute><AddQuizz></AddQuizz></PrivateRoute>} ></Route>
      </Routes>

      <ToastContainer />
      <Modal />
    </div>
  );
}

export default App;
