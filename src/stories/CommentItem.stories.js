import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CommentItem from '../components/CommentItem';
import store from '../states/index';

const stories = {
  title: 'CommentItem',
  component: CommentItem,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </BrowserRouter>
    ),
  ],
};

export default stories;

const TemplateStory = (args) => <CommentItem {...args} />;

const CommentItemDefault = TemplateStory.bind({});

CommentItemDefault.args = {
  id: "comment-1",
  content: "Ini adalah komentar pertama",
  createdAt: "2021-06-21T07:00:00.000Z",
  owner: {
    id: "users-1",
    name: "John Doe",
    avatar: "https://ui-avatars.com/api/?name=cio"
  },
  upVotesBy: [],
  downVotesBy: [],
  threadId: 'thread-blabla'
};

export { CommentItemDefault };
