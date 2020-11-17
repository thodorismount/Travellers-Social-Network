
import React from 'react';
import Divider from '@material-ui/core/Divider';

const CommentItem = ({ postId, comment: { text, name, date } }) => {
  return (
    <div>
      <div style={{ margin: '0.9rem' }}>
        <h4 style={{ lineHeight: '0.9rem'}}>{name}</h4>
        <p>{text}</p>
        <Divider/>
      </div>
    </div>
  );
};

export default CommentItem;
