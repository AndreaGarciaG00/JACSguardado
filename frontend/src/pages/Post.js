import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const socket = io('/', {
    reconnection: true
});

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postAddLike, setPostAddLike] = useState([]);
    const [postRemoveLike, setPostRemoveLike] = useState([]);

    const showPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/posts/show');
            setPosts(data.posts);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.error);
        }
    };

    useEffect(() => {
        showPosts();
    }, []);

    useEffect(() => {
        socket.on('add-like', (newPosts) => {
            setPostAddLike(newPosts);
            setPostRemoveLike([]);
        });
        socket.on('remove-like', (newPosts) => {
            setPostRemoveLike(newPosts);
            setPostAddLike([]);
        });
    }, []);

    let uiPosts = postAddLike.length > 0 ? postAddLike : postRemoveLike.length > 0 ? postRemoveLike : posts;

    return (
        <>
            <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
                <Navbar />
                <Container sx={{ pt: 5, pb: 5, minHeight: '83vh' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Post
                        </Typography>
                        <Paper sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    uiPosts.map((post, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <PostCard
                                                id={post._id}
                                                title={post.title}
                                                content={post.content.replace(/<\/?[^>]+(>|$)/g, "")}
                                                image={post.image ? post.image.url : ''}
                                                subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
                                                likes={post.likes.length}
                                                likesId={post.likes}
                                            />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </Paper>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </>
    );
};

export default Post;
