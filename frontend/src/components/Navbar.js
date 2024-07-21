import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
        h6: {
            fontFamily: '"Arial Black", Gadget, sans-serif',
            fontSize: '1.8rem',
        },
        body1: {
            fontFamily: '"Open Sans", sans-serif',
        },
    },
});

const pages = ['Home', 'Podcast', 'Post', 'Eventos'];  // Asegúrate de incluir 'Podcast' aquí

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.signIn);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const logOutUser = () => {
        dispatch(userLogoutAction());
        setTimeout(() => {
            window.location.reload(true);
            navigate('/');
        }, 500);
    };

    const list = (
        <Box sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {pages.map((text) => (
                    <ListItem button key={text}>
                        <ListItemText>
                            <RouterLink to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
                                style={{ color: 'inherit', textDecoration: 'none' }}>
                                <Typography variant="body1" sx={{ lineHeight: '1rem' }}>
                                    {text}
                                </Typography>
                            </RouterLink>
                        </ListItemText>
                    </ListItem>
                ))}
                {userInfo && userInfo.role === 'admin' && (
                    <ListItem button>
                        <ListItemText>
                            <RouterLink to="/admin/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
                                <Typography variant="body1" sx={{ lineHeight: '1rem', color: '#1976d2' }}>
                                    Admin Dashboard
                                </Typography>
                            </RouterLink>
                        </ListItemText>
                    </ListItem>
                )}
            </List>
            <Divider />
            <List>
                {userInfo ? (
                    <ListItem button onClick={logOutUser}>
                        <ListItemText>
                            <Typography variant="body1" sx={{ color: '#e53935' }}>
                                Log Out
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ) : (
                    <>
                        <ListItem button>
                            <ListItemText>
                                <RouterLink to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <Typography variant="body1" sx={{ lineHeight: '1rem' }}>
                                        Login
                                    </Typography>
                                </RouterLink>
                            </ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemText>
                                <RouterLink to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <Typography variant="body1" sx={{ lineHeight: '1rem' }}>
                                        Registrarse
                                    </Typography>
                                </RouterLink>
                            </ListItemText>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Container maxWidth="lg">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    JACS
                                </RouterLink>
                            </Typography>
                            {userInfo && (
                                <Tooltip title="Perfil">
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        color="inherit"
                                        aria-label="avatar"
                                        onClick={() => navigate('/perfil')}
                                    >
                                        <Avatar alt={userInfo.nombre} src={userInfo.imagen} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    {list}
                </Drawer>
            </Box>
        </ThemeProvider>
    );
};

export default Navbar;
