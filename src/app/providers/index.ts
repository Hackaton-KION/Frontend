import compose from 'compose-function';
import { withStyles } from './with-styles';
import { withRouter } from './with-router';
import { withStrictMode } from './with-strict-mode';

export const withProviders = compose(withRouter, withStyles, withStrictMode);
