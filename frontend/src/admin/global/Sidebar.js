import React, { useEffect } from 'react';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EventIcon from '@mui/icons-material/Event';
import PodcastIcon from '@mui/icons-material/Podcasts';
import BookIcon from '@mui/icons-material/Book';
import CollaboratorIcon from '@mui/icons-material/Group'; // Importa el icono de colaboradores
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, userProfileAction } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const SidebarAdm = () => {
    const { userInfo } = useSelector(state => state.signIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userProfileAction());
    }, [dispatch]);

    // Logout function
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    return (
        <>
            <Sidebar backgroundColor="white" style={{ borderRightStyle: "none" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
                    <Box sx={{ pt: 4 }}>
                        <Menu
                            menuItemStyles={{
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#000",
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: "#fafafa",
                                        color: "#1976d2",
                                    },
                                },
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: '#1976d2',
                                    }
                                },
                            }}
                        >
                            {userInfo && userInfo.role === 'admin' && (
                                <>
                                    <MenuItem component={<Link to="/admin/dashboard" />} icon={<DashboardIcon />}> Post </MenuItem>
                                    <MenuItem component={<Link to="/admin/event" />} icon={<EventIcon />}> Eventos </MenuItem>
                                    <MenuItem component={<Link to="/admin/podcast" />} icon={<PodcastIcon />}> Podcasts </MenuItem>
                                    <MenuItem component={<Link to="/admin/book" />} icon={<BookIcon />}> Libros </MenuItem>
                                    <MenuItem component={<Link to="/admin/psychologist" />} icon={<BookIcon />}> Psicologos </MenuItem>
                                    <MenuItem component={<Link to="/admin/collaborator" />} icon={<CollaboratorIcon />}> Colaboradores </MenuItem> {/* Nueva opción para gestionar colaboradores */}
                                    <MenuItem component={<Link to="/user/dashboard" />} icon={<DashboardIcon />}> Regresar </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Menu
                            menuItemStyles={{
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#000",
                                    },
                                    '&:hover': {
                                        backgroundColor: "#fafafa",
                                        color: "#1976d2",
                                    },
                                },
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: '#1976d2',
                                    }
                                },
                            }}
                        >
                            <MenuItem onClick={logOut} icon={<LoginIcon />}> Cerrar Sesion </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Sidebar>
        </>
    );
}

export default SidebarAdm;
