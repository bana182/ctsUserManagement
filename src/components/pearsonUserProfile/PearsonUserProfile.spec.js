import React from "react";
import { shallow } from "enzyme";
import { PearsonUserProfile } from "./PearsonUserProfile";

describe("PearsonUserProfile", () => {
    let wrapper;
    beforeEach(() => {
     let  sessionStorage =  new class {
            store = {};
            setItem = (key, val) => (this.store[key] = val);
            getItem = key => this.store[key];
            removeItem = key => { delete this.store[key]; };
            clear = () => (this.store = {});
          }();
      window.sessionStorage = sessionStorage;
      });
  it("renders the User on browser", () => {
    const user =  {
        id: 6,
        first_name: "Tracey",
        last_name: "Ramos",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
      }
    
    const baseProps = {
        user: user,
        deleteUser: jest.fn((user)=>{
            userTobeDeleted = user
        }),
      };
    wrapper = shallow(<PearsonUserProfile {...baseProps}/>);
    const cardTitle = wrapper.find('.card-title');
    expect(cardTitle.text()).toContain(user.first_name);
  });

  it("click on the delete link calls the deleteUserMethod", () => {
    const user =  {
        id: 6,
        first_name: "Tracey",
        last_name: "Ramos",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
      }
    
    const baseProps = {
        user: user,
        deleteUser: jest.fn((user)=>{
            userTobeDeleted = user
        }),
      };
    wrapper = shallow(<PearsonUserProfile {...baseProps}/>);
    let userTobeDeleted;
    const deletebutton = wrapper.find('a');
    deletebutton.simulate('click');
    expect(baseProps.deleteUser).toHaveBeenCalled();
    expect(userTobeDeleted).toBeDefined();
});

});