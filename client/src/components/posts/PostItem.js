import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';
import PostCard from '../PostCard';
import moment from 'moment';
import '../Navbar.css';
import '../../re.css';

const PostItem = ({
  post: {
    _id,
    image,
    avatar,
    text,
    firstName,
    lastName,
    location,
    user,
    likes,
    comments,
    date,
    updatedAt
  }
}) => {
  return (
    <PostCard
      id={_id}
      likes={likes}
      avatar={avatar}
      image={image}
      user={user}
      caption={text}
      username={`${firstName}  ${lastName}`}
      location={`${location}`}
      date={`${
        moment(date).fromNow().includes('day') ||
        moment(date).fromNow().includes('month') ||
        moment(date).fromNow().includes('year')
          ? moment(date).format('DD MMMM YYYY')
          : moment(date).fromNow()
      }`}
    />
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
