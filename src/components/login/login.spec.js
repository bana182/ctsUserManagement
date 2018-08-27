import React from "react";
import { shallow } from "enzyme";
import { Login } from "./login";
import { Constants } from "../../constants";
import { createMemoryHistory } from 'history';

describe("Login", () => {

    it("renders the login page ", () => {
        const wrapper = shallow(<Login />);
        const h1 = wrapper.find('h1');
        expect(h1.text()).toContain(Constants.APP_TITLE);
    });

    it('it will check the authenticity and show error', () => {
        const userProfile = {
            username: "mnaihs",
            password: "sdasd"
        };

        const history = createMemoryHistory('/');
        const wrapper = shallow(<Login history={history} />);
        wrapper.setState({ userProfile: userProfile });
        const spy = jest.spyOn(wrapper.instance(), 'checkForAuthentication');
        wrapper.update();
        wrapper.instance().checkForAuthentication();
        expect(wrapper.instance().checkForAuthentication).toBeCalled();
        expect(wrapper.instance().state.notify).toBe(true);
    });
});