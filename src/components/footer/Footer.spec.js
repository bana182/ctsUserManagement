import React from "react";
import { shallow } from "enzyme";
import { Footer } from "./Footer";

describe("Footer", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Footer />);
  });

  it("renders the footer message", () => {
    const h1 = component.find("span");
    expect(h1.text()).toEqual("User-management @2018");
  });
});