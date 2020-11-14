import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ManagePost from '../components/ManagePost';
import { connect } from 'react-redux';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { addLike, removeLike } from '../actions/post';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '60%',
    marginBottom: '1.5rem',
    margin: '1rem'
    // marginLeft: '10%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  titleFont: {
    fontSize: '1.25rem'
  },
  subheaderFont: {
    fontSize: '1rem',
    color: '#191919'
  }
}));

function PostCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState({});

  const checkLiked = () => {
    if (props.likes && props.likes.length > 0) {
      for (let i = 0; i < props.likes.length; i++) {
        if (props.likes[i].user === (props.authUser && props.authUser._id)) {
          setState({ liked: true });
          break;
        } else {
          setState({ liked: false });
        }
      }
    } else {
      setState({ liked: false });
    }
  };

  useEffect(() => {
    checkLiked();
  }, []);

  const handleLike = () => {
    props.addLike(props.id);
    setState({ liked: true });
  };

  const handleUnlike = () => {
    props.removeLike(props.id);
    setState({ liked: false });
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link
            to={`/userProfile/${props.user && props.user}`}
            style={{ textDecoration: 'none', color: '#000' }}
          >
            <Avatar
              aria-label='recipe'
              src='/static/images/girl_female_woman_avatar-512.png'
              className={classes.avatar}
            ></Avatar>
          </Link>
        }
        action={
          props.user === (props.authUser && props.authUser._id) ? (
            <ManagePost
              id={props.id}
              image={props.image}
              text={props.caption}
              location={props.location}
            />
          ) : null
        }
        title={
          <Link
            to={`/userProfile/${props.user && props.user}`}
            style={{ textDecoration: 'none', color: '#000' }}
          >
            {props.username}
          </Link>
        }
        subheader={`${props.location}, ${props.date}`}
        classes={{ title: classes.titleFont, subheader: classes.subheaderFont }}
        style={{ textTransform: 'capitalize' }}
      />
      <CardMedia className={classes.media} image={props.image} />
      <CardContent>
        <Typography variant='h6' component='p'>
          {props.caption}
        </Typography>
      </CardContent>
      <Divider variant='middle' />
      <CardActions disableSpacing>
        {/* like buttons  */}
        {!state.liked ? (
          <IconButton onClick={handleLike}>
            <FavoriteBorder style={{ color: '#000' }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleUnlike}>
            <Favorite style={{ color: 'rgba(238,1,1,1)' }} />
          </IconButton>
        )}

        {props.likes && props.likes.length}

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments...</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapStateToProps = state => ({
  authUser: state.auth.user
});

export default connect(mapStateToProps, { addLike, removeLike })(PostCard);
