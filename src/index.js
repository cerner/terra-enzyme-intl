/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
import { createElement } from 'react';
import { IntlProvider } from 'react-intl';
import { mount, shallow, render } from 'enzyme';

export const mockIntl = {
  defaultLocale: 'en',
  formatDate: () => 'mock date',
  formatMessage: ({ id }) => id,
  formatNumber: value => `${value}`,
  formatPlural: value => `${value}`,
  formatTime: value => `${value}`,
  formatRelativeTime: value => `${value}`,
};

const messageProxy = new Proxy({}, {
  get: (_, property) => property,
  getOwnPropertyDescriptor: () => ({ configurable: true, enumerable: true }),
}); // eslint-disable-line compat/compat
const locale = 'en';
const defaultLocale = 'en';

export const mountWithIntl = (node, options = {}) => {
  const opts = {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages: messageProxy,
    },
    ...options,
  };

  return mount(node, opts);
};
export const renderWithIntl = (node, options = {}) => {
  const subject = createElement(IntlProvider, {
    locale,
    defaultLocale,
    messages: messageProxy,
  }, node);

  return render(subject, options);
};

export const shallowWithIntl = (node, options = {}) => {
  const opts = {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages: messageProxy,
    },
    ...options,
  };

  return shallow(node, opts);
};

export default {
  mockIntl,
  mountWithIntl,
  shallowWithIntl,
  renderWithIntl,
};
