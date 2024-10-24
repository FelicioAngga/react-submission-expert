import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';

/**
 * test scenario
 *
 *  - asyncPreloadProcess thunk
 *  - should dispatch action correctly when preload success and finally set preload to false
 *  - should dispatch action and call alert correctly when preload failed
*/

const fakeErrorResponse = new Error('Token maximum age exceeded');
const fakeOwnProfile = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });
  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when preload success and finally set preload to false', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeOwnProfile);
    const dispatch = jest.fn();

    await asyncPreloadProcess()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeOwnProfile));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when preload failed ', async () => {
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();
    api.putAccessToken = jest.fn();

    await asyncPreloadProcess()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(api.putAccessToken).toHaveBeenCalledWith('');
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
