import React from 'react';
import { shallow, mount } from 'enzyme';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  shallowWithIntl,
  mountWithIntl,
  renderWithIntl,
  mockIntl,
  shallowContext,
  mountContext,
} from '../../src';

const prettyPrintProps = props => JSON.stringify(props, undefined, 2);

const FormattedMessageSubject = props => (
  <div>
    <FormattedMessage id="TerraEnzymeIntl.helloWorld" />
    <FormattedMessage id="TerraEnzymeIntl.buttonText">
      {text => <button type="button">{text}</button>}
    </FormattedMessage>
    {prettyPrintProps(props)}
  </div>
);

const InjectIntlSubject = injectIntl(({ intl, ...props }) => (
  <div>
    {intl.formatMessage({ id: 'TerraEnzymeIntl.helloWorld' })}
    <button type="button">{intl.formatMessage({ id: 'TerraEnzymeIntl.buttonText' })}</button>
    {prettyPrintProps(props)}
  </div>
));

const ContextTypesSubject = (props, { intl }) => (
  <div>
    {intl.formatMessage({ id: 'TerraEnzymeIntl.helloWorld' })}
    <button type="button">{intl.formatMessage({ id: 'TerraEnzymeIntl.buttonText' })}</button>
    {prettyPrintProps(props)}
  </div>
);
ContextTypesSubject.contextTypes = {
  /* eslint-disable consistent-return */
  intl: (context) => {
    if (context.intl === undefined) {
      return new Error('Component is internationalized, and must be wrapped in terra-base');
    }
  },
  /* eslint-enable consistent-return */
};

describe('shallowWithIntl', () => {
  describe('using FormattedMessage', () => {
    const subject = <FormattedMessageSubject foo="bar" />;
    const wrapper = shallowWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using injectIntl', () => {
    const subject = <InjectIntlSubject foo="bar" />;
    const wrapper = shallowWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using contextTypes', () => {
    const subject = <ContextTypesSubject foo="bar" />;
    const wrapper = shallowWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('mountWithIntl', () => {
  describe('using FormattedMessage', () => {
    const subject = <FormattedMessageSubject foo="bar" />;
    const wrapper = mountWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using injectIntl', () => {
    const subject = <InjectIntlSubject foo="bar" />;
    const wrapper = mountWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using contextTypes', () => {
    const subject = <ContextTypesSubject foo="bar" />;
    const wrapper = mountWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('renderWithIntl', () => {
  describe('using FormattedMessage', () => {
    const subject = <FormattedMessageSubject foo="bar" />;
    const wrapper = renderWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using injectIntl', () => {
    const subject = <InjectIntlSubject foo="bar" />;
    const wrapper = renderWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using contextTypes', () => {
    const subject = <ContextTypesSubject foo="bar" />;
    const wrapper = renderWithIntl(subject);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('mockIntl', () => {
  const subject = intl => intl.formatMessage({ id: 'TerraEnzymeIntl.foo' });
  const expected = 'TerraEnzymeIntl.foo';

  describe('when used in a method expecting the react-intl intl object', () => {
    it('should match the expected output', () => {
      expect(subject(mockIntl)).toEqual(expected);
    });
  });
});


describe('shallowContext with shallow', () => {
  describe('using FormattedMessage', () => {
    const subject = <FormattedMessageSubject foo="bar" />;
    const wrapper = shallow(subject, shallowContext);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using injectIntl', () => {
    const subject = <InjectIntlSubject foo="bar" />;
    const wrapper = shallow(subject, shallowContext);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using contextTypes', () => {
    const subject = <ContextTypesSubject foo="bar" />;
    const wrapper = shallow(subject, shallowContext);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('mountContext with mount', () => {
  describe('using FormattedMessage', () => {
    const subject = <FormattedMessageSubject foo="bar" />;
    const wrapper = mount(subject, mountContext);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using injectIntl', () => {
    const subject = <InjectIntlSubject foo="bar" />;
    const wrapper = mount(subject, mountContext);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('using contextTypes', () => {
    const subject = <ContextTypesSubject foo="bar" />;
    const wrapper = mount(subject, mountContext);

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
