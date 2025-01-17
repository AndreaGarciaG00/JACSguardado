import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PostCard = ({
    id,
    title,
    subheader,
    image,
    content,
    likes,
    likesId
}) => {

    const { userInfo } = useSelector(state => state.signIn);

    // Agregar like
    const addLike = async () => {
        try {
            await axios.put(`/api/addlike/post/${id}`);
        } catch (error) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    }

    // Eliminar like
    const removeLike = async () => {
        try {
            await axios.put(`/api/removelike/post/${id}`);
        } catch (error) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={title}
                subheader={subheader}
            />
            <Link to={`/post/${id}`}>
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="Imagen del post"
                    sx={{ objectFit: 'cover' }}
                />
            </Link>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <Box component='span' dangerouslySetInnerHTML={{ __html: content.split(" ").slice(0, 10).join(" ") + "..." }}></Box>
                </Typography>
            </CardContent>
            <CardActions>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        {
                            likesId.includes(userInfo && userInfo.id) ?
                                <IconButton onClick={removeLike} aria-label="quitar de favoritos">
                                    <FavoriteIcon sx={{ color: 'red' }} />
                                </IconButton>
                                :
                                <IconButton onClick={addLike} aria-label="agregar a favoritos">
                                    <FavoriteBorderIcon sx={{ color: 'red' }} />
                                </IconButton>
                        }
                        {likes} Me gusta(s)
                    </Box>
                </Box>
            </CardActions>
        </Card>
    );
}

export default PostCard;
