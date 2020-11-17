import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  UPDATE_POST,
  GET_PROFILE_POSTS,
  FETCH_MORE,
  FETCH_MORE_PROFILE,
  ADD_COMMENT,
  LOGOUT,
  CLEAR_POSTS
} from '../actions/types';

const initialState = {
  posts: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        loading: true
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case FETCH_MORE:
      return {
        ...state,
        posts: [...state.posts, payload].flat(),
        loading: false
      };
    case GET_PROFILE_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: [...state.posts],
        loading: false
      };

    case FETCH_MORE_PROFILE:
      return {
        ...state,
        posts: [...state.posts, payload].flat(),

        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };

    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === payload.id
            ? { ...post, comments: payload.comments }
            : post
        ),
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        posts: [],
        post: null,
        loading: false
      };
    default:
      return state;
  }
}
