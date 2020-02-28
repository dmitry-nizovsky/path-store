import React, { useRef } from 'react';
import useStore from '../../../core/use-effect'


const actionAddComment = (dispatch, element, length) => {
  const value = element.current.value;

  dispatch('comments.content', (state) => state.concat([value]));
  dispatch('comments.length', _ => length + 1);

  element.current.value = '';
};

const AddComment = () => {
  const inputEl = useRef(null);
  const [ state, dispatch ] = useStore({
    placeholder: '',
    comments: []
  }, {
    'comments.form.add.placeholder': 'placeholder',
    'comments.content': 'comments'
  });
  const { placeholder, comments } = state;

  console.log('AddComment', state, inputEl);

  return (
    <div className="add-comment">
      <input placeholder={placeholder} ref={inputEl} />
      <button onClick={actionAddComment.bind(null, dispatch, inputEl, comments.length)}>add</button>
    </div>
  );
};

export default AddComment;
