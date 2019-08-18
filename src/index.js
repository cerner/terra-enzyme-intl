/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
import { cloneElement } from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow, render } from 'enzyme';

export const mockIntl = {
  defaultLocale: 'en',
  formatDate: () => 'mock date',
  formatHTMLMessage: ({ id }) => id,
  formatMessage: ({ id }) => id,
  formatNumber: value => `${value}`,
  formatPlural: value => `${value}`,
  formatTime: value => `${value}`,
  formatRelative: value => `${value}`,
  now: () => 0,
};

const messageProxy = new Proxy({}, { get: (_, property) => property });

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en', messages: messageProxy }, {});
const { intl } = intlProvider.getChildContext();

const injectIntl = node => cloneElement(node, { intl });

export const shallowContext = { context: { intl } };
export const mountContext = { context: { intl }, childContextTypes: { intl: intlShape } };

export const mountWithIntl = (node, { context, childContextTypes, ...options } = {}) => {
  const subject = injectIntl(node);
  const opts = {
    context: {
      ...context,
      ...mountContext.context,
    },
    childContextTypes: {
      ...childContextTypes,
      ...mountContext.childContextTypes,
    },
    ...options,
  };

  return mount(subject, opts);
};

export const renderWithIntl = (node, { context, childContextTypes, ...options } = {}) => {
  const subject = injectIntl(node);
  const opts = {
    context: {
      ...context,
      ...mountContext.context,
    },
    childContextTypes: {
      ...childContextTypes,
      ...mountContext.childContextTypes,
    },
    ...options,
  };

  return render(subject, opts);
};

export const shallowWithIntl = (node, { context, ...options } = {}) => {
  const subject = injectIntl(node);
  const opts = {
    context: {
      ...context,
      ...shallowContext.context,
    },
    ...options,
  };

  return shallow(subject, opts);
};

export default {
  mockIntl,
  mountWithIntl,
  shallowWithIntl,
  renderWithIntl,
  shallowContext,
  mountContext,
};
