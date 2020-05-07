import { timeToString } from '../../utils/helpers';

export const mapStateToProps = state => {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
  };
};
