export const signUpFormControls = [
  {
    //Defining array of objects . Done to dynamically render inputs. Pass to form-controls
    name: "userName",
    label: "User Name",
    placeholder: "Enter you username",
    type: "text",
    componentType: "input", // renders based on this switch case made
  },
  {
    name: "userEmail",
    label: "Email Address",
    placeholder: "Enter you email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter you password",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: "Email Address",
    placeholder: "Enter you email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter you password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};
