import React from "react";
import { shallow } from "enzyme";
import { Header } from "./header";

describe("Header", () => {
  beforeEach(() => {
    let sessionStorage = new class {
      store = {};
      setItem = (key, val) => (this.store[key] = val);
      getItem = key => this.store[key];
      removeItem = key => { delete this.store[key]; };
      clear = () => (this.store = {});
    }();
    window.sessionStorage = sessionStorage;
  });

  it("renders the header message", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('label').text()).toEqual('PEARSON');
  });
});