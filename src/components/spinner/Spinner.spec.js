import React from "react";
import { shallow } from "enzyme";
import { Spinner } from "./Spinner";

describe("Footer", () => {
    let component;

    beforeEach(() => {
        component = shallow(<Spinner />);
    });

    it("renders the spinner message", () => {
        const innerdiv = component.find(".inner");
        expect(innerdiv.children.length).toBe(1);
    });
});