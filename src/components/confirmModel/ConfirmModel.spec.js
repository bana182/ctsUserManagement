import React from "react";
import { shallow } from "enzyme";
import { ConfirmModel } from "./ConfirmModel";
import { Constants } from "../../constants";

describe("Confirm Model", () => {
    let component;

    beforeEach(() => {
        const user = {
            id: 4,
            first_name: "Eve",
            last_name: "Holt",
            avatar:
                "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        }
        component = shallow(<ConfirmModel user={user} close={() => { }} confirmDelete={() => { }} />);
    });

    it("renders a dialog label ", () => {
        const label = component.find(".modalBox-header");
        expect(label.text()).toContain(Constants.CONFIRM_DIALOG_LABEL);
    });
});