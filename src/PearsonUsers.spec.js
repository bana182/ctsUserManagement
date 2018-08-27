import React from "react";
import { shallow } from "enzyme";
import { PearsonUsers } from "./PearsonUsers";
import { Constants } from "./constants";
import { Users } from "./mockData/Users.js";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PearsonUserService } from './services/PearsonUserService';
import { createMemoryHistory } from 'history';

describe("PearsonUsers", () => {
  const mock = new MockAdapter(axios);
  mock.onGet(Constants.USER_API).reply(200, {
    data: Users.data
  });

  let sessionStorage = new class {
    store = {};
    setItem = (key, val) => (this.store[key] = val);
    getItem = key => this.store[key];
    removeItem = key => { delete this.store[key]; };
    clear = () => (this.store = {});
  }();
  window.sessionStorage = sessionStorage;

  it('fetches users from PearsonUserService and renders them on mount', async () => {
    const history = createMemoryHistory('/');
    const wrapper = shallow(<PearsonUsers history={history} />);
    await wrapper.instance().componentDidMount()
    setTimeout(async () => {
      wrapper.update();
      const state = wrapper.instance().state;
      expect(state.users.length).toEqual(12);
      expect(wrapper.find("PearsonUserProfile").length).toEqual(12);
    });
  });

  it('remove the duplicates from the array of Users', () => {
    const history = createMemoryHistory('/');
    const wrapper = shallow(<PearsonUsers history={history} />);
    const spy = jest.spyOn(wrapper.instance(), 'removeDuplicates');
    wrapper.update();
    let uniqueData = wrapper.instance().removeDuplicates(Users.data);
    expect(wrapper.instance().removeDuplicates).toBeCalled();
    expect(uniqueData.length).toBeLessThan(Users.data.length);
  });

  it("renders a h1", () => {
    const history = createMemoryHistory('/');
    const wrapper = shallow(<PearsonUsers history={history} />);
    const h1 = wrapper.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  it('will delete the user from the list', () => {
    const history = createMemoryHistory('/');
    const wrapper = shallow(<PearsonUsers history={history} />);
    const spy = jest.spyOn(wrapper.instance(), 'deleteUserFromList');
    wrapper.update();
    wrapper.instance().deleteUserFromList(Users.data[0]);
    expect(wrapper.instance().deleteUserFromList).toBeCalled();
    expect(wrapper.instance().state.users.length).toBeLessThan(Users.data.length);
  })
});