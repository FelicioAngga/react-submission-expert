const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;

    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { token } } = responseJson;

    return token;
  }

  async function getOwnProfile() {
    if (!getAccessToken()) return null;
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    const { data: { user } } = responseJson;

    return user;
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { data: { leaderboards } } = responseJson;
    return leaderboards;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { data: { threads } } = responseJson;
    return threads;
  }

  async function getThreadById(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { data: { detailThread } } = responseJson;
    return detailThread;
  }

  async function addThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title, body, category,
      }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    const { data: { thread } } = responseJson;

    return thread;
  }

  async function upvoteThread({ threadId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    const { data: { vote } } = responseJson;

    return vote;
  }

  async function downvoteThread({ threadId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    const { data: { vote } } = responseJson;

    return vote;
  }

  async function neutralizeVoteThread({ threadId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    const { data: { vote } } = responseJson;

    return vote;
  }

  async function upVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    const { data: { vote } } = responseJson;

    return vote;
  }

  async function downVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    const { data: { vote } } = responseJson;

    return vote;
  }

  async function neutralizeVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    const { data: { vote } } = responseJson;

    return vote;
  }

  async function addComment({ threadId, content }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    const { data: { comment } } = responseJson;

    return comment;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getLeaderboards,
    getAllThreads,
    getThreadById,
    getOwnProfile,
    addThread,
    upvoteThread,
    downvoteThread,
    neutralizeVoteThread,
    upVoteComment,
    downVoteComment,
    neutralizeVoteComment,
    addComment,
  };
})();

export default api;
