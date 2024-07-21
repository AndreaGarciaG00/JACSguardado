import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import CreatePost from './admin/CreatePost';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Layout from './admin/global/Layout';
import EditPost from './admin/EditPost';
import UserDashboard from './user/UserDashboard';
import SinglePost from './pages/SinglePost';
import Post from './pages/Post';
import PodcastPage from './pages/PodcastPage';  // Asegúrate de importar PodcastPage
import PodcastDashboard from './admin/podcast/PodcastDashboard';
import CreatePodcast from './admin/podcast/CreatePodcast';
import EditPodcast from './admin/podcast/EditPodcast';
import EventDashboard from './admin/event/EventDashboard';
import CreateEvent from './admin/event/CreateEvent';
import EditEvent from './admin/event/EditEvent';
import EventPage from './pages/EventPage';
import BookDashboard from './admin/Book/BookDashboard';
import CreateBook from './admin/Book/CreateBook';
import EditBook from './admin/Book/EditBook';
import PsychologistDashboard from './admin/Psychologist/PsychologistDashboard';
import CreatePsychologist from './admin/Psychologist/CreatePsychologist';
import EditPsychologist from './admin/Psychologist/EditPsychologist';
import CollaboratorDashboard from './admin/Collaborator/CollaboratorDashboard';
import CreateCollaborator from './admin/Collaborator/CreateCollaborator';
import EditCollaborator from './admin/Collaborator/EditCollaborator';

const AdminDashboardHOC = Layout(AdminDashboard);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const UserDashboardHOC = Layout(UserDashboard);
const EventDashboardHOC = Layout(EventDashboard);
const CreateEventHOC = Layout(CreateEvent);
const EditEventHOC = Layout(EditEvent);
const PodcastDashboardHOC = Layout(PodcastDashboard);
const CreatePodcastHOC = Layout(CreatePodcast);
const EditPodcastHOC = Layout(EditPodcast);
const BookDashboardHOC = Layout(BookDashboard);
const CreateBookHOC = Layout(CreateBook);
const EditBookHOC = Layout(EditBook);
const PsychologistDashboardHOC = Layout(PsychologistDashboard);
const CreatePsychologistHOC = Layout(CreatePsychologist);
const EditPsychologistHOC = Layout(EditPsychologist);
const CollaboratorDashboardHOC = Layout(CollaboratorDashboard);
const CreateCollaboratorHOC = Layout(CreateCollaborator);
const EditCollaboratorHOC = Layout(EditCollaborator);

const App = () => {
    return (
        <>
            <ToastContainer />
            <Provider store={store}>
                <ProSidebarProvider>
                    <Router>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<LogIn />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/post/:id' element={<SinglePost />} />
                            <Route path='/post' element={<Post />} />
                            <Route path='/podcast' element={<PodcastPage />} />  {/* Ruta para PodcastPage */}
                            <Route path='/eventos' element={<EventPage />} />
                            <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/post/create' element={<AdminRoute><CreatePostHOC /></AdminRoute>} />
                            <Route path='/admin/post/edit/:id' element={<AdminRoute><EditPostHOC /></AdminRoute>} />
                            <Route path='/admin/event' element={<AdminRoute><EventDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/event/create' element={<AdminRoute><CreateEventHOC /></AdminRoute>} />
                            <Route path='/admin/event/edit/:id' element={<AdminRoute><EditEventHOC /></AdminRoute>} />
                            <Route path='/admin/podcast' element={<AdminRoute><PodcastDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/podcast/create' element={<AdminRoute><CreatePodcastHOC /></AdminRoute>} />
                            <Route path='/admin/podcast/edit/:id' element={<AdminRoute><EditPodcastHOC /></AdminRoute>} />
                            <Route path='/admin/book' element={<AdminRoute><BookDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/book/create' element={<AdminRoute><CreateBookHOC /></AdminRoute>} />
                            <Route path='/admin/book/edit/:id' element={<AdminRoute><EditBookHOC /></AdminRoute>} />
                            <Route path='/admin/psychologist' element={<AdminRoute><PsychologistDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/psychologist/create' element={<AdminRoute><CreatePsychologistHOC /></AdminRoute>} />
                            <Route path='/admin/psychologist/edit/:id' element={<AdminRoute><EditPsychologistHOC /></AdminRoute>} />
                            <Route path='/admin/collaborator' element={<AdminRoute><CollaboratorDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/collaborator/create' element={<AdminRoute><CreateCollaboratorHOC /></AdminRoute>} />
                            <Route path='/admin/collaborator/edit/:id' element={<AdminRoute><EditCollaboratorHOC /></AdminRoute>} />
                            <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </Router>
                </ProSidebarProvider>
            </Provider>
        </>
    );
}

export default App;
