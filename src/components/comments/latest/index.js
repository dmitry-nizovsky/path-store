import React from 'react';
import useStore from '../../../core/use-effect';

/**
 * @TODO: need add ability add callback for identify changes in select sector
 * e.g.: we want get last of comment, but we haven't path for this action
 * but if we add cache callback (prevState, state) => prevState[prevState.length - 1] === state[state.length - 1]
 */
const LatestComment = () => {
  const [ state ] = useStore({
    comments: []
  }, {
    'comments.content': 'comments',
  });
  const { comments } = state;

  console.log('LatestComment', state);

  return (
    <div className='latest-comment'>
      {comments[comments.length - 1]}
    </div>
  );
};

export default LatestComment;
