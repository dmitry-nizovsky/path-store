import React from 'react';
import useStore from '../../core/use-effect'
import Title from '../../components/title';
import Comments from '../../components/comments'
import AddComment from '../../components/forms/add-comment'
import LatestComment from '../../components/comments/latest'


const App = () => {
  const [ state ] = useStore({
    title: 'noop'
  }, {
    'comments.title': 'title',
  });
  const { title } = state;

  console.log('App', state);

  return (
    <div className='app'>
      <Title text={title} />
      <AddComment />
      <Comments />
      <h2>Latest Comment:</h2>
      <LatestComment />
    </div>
  );
};

export default App;
