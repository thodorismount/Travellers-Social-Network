import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  UPDATE_POST,
  ADD_POST,
  GET_PROFILE_POSTS,
  FETCH_MORE,
  FETCH_MORE_PROFILE,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_POSTS
} from './types';

//GET POSTS
export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: CLEAR_POSTS, payload: null });

    const res = await axios.get(`/api/posts`);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// fetch 5 more posts
export const fetchMore = skip => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/fetchMore?skip=${skip}`);
    dispatch({
      type: FETCH_MORE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// get 5 posta of a specific profile
export const getProfilePosts = id => async dispatch => {
  try {
    dispatch({ type: CLEAR_POSTS, payload: null });

    const res = await axios.get(`/api/posts/profile/${id}`);

    dispatch({
      type: GET_PROFILE_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// get 5 next posts of a profile
export const fetchMoreProfile = (id, skip) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/posts/profile/fetchMoreProfile/${id}?skip=${skip}`
    );

    dispatch({
      type: FETCH_MORE_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//ADD Post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    window.location.reload();

    dispatch(setAlert('Post created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });
    window.location.reload();
    dispatch(setAlert('Post was deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// add likes

export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit post
export const editPost = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/posts/${id}`, formData, config);
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//ADD Comment

export const addComment = (id, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/posts/comment/${id}`, text, config);
    dispatch({
      type: ADD_COMMENT,
      payload: { id, comments: res.data }
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//DELETE Comments
export const removeComment = (id, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${id}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: { id, comments: res.data }
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    console.log(err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
