import React, { Component } from "react";
import { ToastContainer, ToastStore } from 'react-toasts';
import { PearsonUserProfile } from './components/pearsonUserProfile/PearsonUserProfile';
import { ConfirmModel } from './components/confirmModel/ConfirmModel';
import { Spinner } from './components/spinner/Spinner';
import { Constants } from './constants';
import { PearsonUserService } from './services/PearsonUserService';
import './PearsonUsers.css';

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModelBox: false,
      userToBeDeleted: null,
      loading: false,
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };

    this.openModelBox = this.openModelBox.bind(this);
    this.close = this.close.bind(this);
    this.deleteUserFromList = this.deleteUserFromList.bind(this);
  }

  componentWillMount() {
    if (!sessionStorage.getItem('userInfo')) {
      this.props.history.push('/login');
    }
  }
  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    this.setState({ loading: true });
    try {
      const res = await PearsonUserService(Constants.USER_API);
      const userList = res.data;
      let users = [...this.state.users, ...userList];
      users = this.removeDuplicates(users);
      this.setState({ users: users, loading: false });
    } catch (error) {
      ToastStore.error(Constants.UNABLE_FETCH_USER);
      this.setState({ loading: false });
    }
  }

  removeDuplicates(users) {
    return users.filter((element, index, self) =>
      index === self.findIndex((t) => (
        t.id === element.id
      ))
    )
  }

  openModelBox(user) {
    this.setState({
      openModelBox: true,
      userToBeDeleted: user
    });
  }

  deleteUserFromList(user) {
    const userList = this.state.users.filter((element) => {
      return element.id !== user.id;
    });

    this.setState({
      users: userList,
      openModelBox: false
    }, () => { ToastStore.success(Constants.DELETE_SUCCESS); });
  }

  close() {
    this.setState({ openModelBox: false, userToBeDeleted: null });
  }
  render() {
    const toasterConfig = { store: ToastStore, position: ToastContainer.POSITION.TOP_CENTER };
    return (
      <div className="pearson-users">
        <div className="container">
          <h1>{Constants.APP_TITLE}</h1>
          <div className="profile">
            {this.state.users.length > 0 ?
              this.state.users.map(element => {
                const baseProps = {
                  key: element.id,
                  user: element,
                  deleteUser: this.openModelBox
                };
                return <PearsonUserProfile {...baseProps} />
              }) :
              <div class="col-md-12">
                <div class="error-template">
                  <h1>{Constants.EMPTY_LIST_TITLE}</h1>
                  <h2>{Constants.EMPTY_LIST_MESSAGE}</h2>
                  <div class="error-details">
                    {Constants.EMPTY_LIST_DETAIL}
                  </div>
                  <div class="error-actions">
                    <a href="#" onClick={() => { this.getUsers() }} class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
                      <span>{Constants.REFRESH_LIST}</span> </a><a href="#" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-envelope"></span> {Constants.CONTACT_SUPPORT} </a>
                  </div>
                </div>
              </div>}
          </div>
          {this.state.openModelBox === true ? <ConfirmModel {...{ close: this.close, user: this.state.userToBeDeleted, confirmDelete: this.deleteUserFromList }} /> : ''}
          {this.state.loading === true ? <Spinner /> : null}
        </div>
        <ToastContainer {...toasterConfig} />
      </div>
    );
  }
}
