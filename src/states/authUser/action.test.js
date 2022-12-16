import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

const fakeLoginResponse = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw"

const fakeOwnProfile = {
  "id": "john_doe",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://generated-image-url.jpg"
}

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });
  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    delete api._login;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when login success', async () => {
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getOwnProfile = () => Promise.resolve(fakeOwnProfile);
    const dispatch = jest.fn();
    api.putAccessToken = jest.fn();
    
    await asyncSetAuthUser({})(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeLoginResponse);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeOwnProfile));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  
  it('should dispatch action and call alert correctly when login failed', async () => {
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncSetAuthUser({})(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

