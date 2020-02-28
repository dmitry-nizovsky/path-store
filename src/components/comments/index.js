import React from 'react';
import useStore from "../../core/use-effect";


const Comments = () => {
  const condition = (prev, curr) => {
    console.log(prev, curr);
    return false; //prev.comments.join(',') + prev.length === curr.comments.join(',') + curr.length;
  };
  const [ state ] = useStore({
    comments: [],
    length: 0
  }, {
    'comments.content': 'comments',
    'comments.length': 'length',
  }, condition);
  const { comments, length } = state;

  console.log('Comments', state);

  return (
    <div className="comment">
      {comments.map((comment, index) => <div className="comment__item" key={index}>{comment}</div>)}
      <div className="comment__length">{length}</div>
    </div>
  );
};

export default Comments;
