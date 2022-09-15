"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if(response.success){
      window.location.reload();
    } else {
      userForm.setLoginErrorMessage('Mistake');
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if(response.success){
      window.location.reload();
    } else {
      userForm.setRegisterErrorMessage('Mistake');
    }
  });
};