import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { createDOM } from 'app';
import { createStores } from 'app/stores';
import { createMemoryHistory } from 'history';
import { Root } from 'app/containers';

describe('Application', () => {
  it('should be mounted without error and have some childrens', () => {
    const history = createMemoryHistory();
    const stores = createStores(history);
    const dom = createDOM(stores);
    const wrapper = mount(dom);

    const rootContainer = wrapper.find(Root);
    expect(rootContainer.html()).to.include('<div>');
    expect(rootContainer.children()).to.not.empty;
  });
});
