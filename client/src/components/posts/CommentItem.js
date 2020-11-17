import React from 'react';

const CommentItem = ({ postId, comment: { text, name, date } }) => {
  return (
    <div
      style={{
        marginBottom: '0.5rem',
        border: '1px solid blue',
        borderRadius: '10px'
      }}
    >
      <div style={{ margin: '0.2rem' }}>
        <h4 style={{ lineHeight: '0.2rem' }}>{name}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
