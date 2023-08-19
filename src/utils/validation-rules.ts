
export type loginProp = {
  email: string;
  password: string;
};

export const email = {
  required: "Email is required",
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "Enter valid email address",
  },
};

export const password = {
  required: "Password is required",
  minLength: { value: 8, message: "Minimum 8 charactors only" },
  maxLength: { value: 16, message: "Maximum 16 charactors only" },
};

export const firstname = {
  required: "FirstName is required",
};

export const lastname = {
  required: "LastName is required",
};

export const confrimPwd = {
  required: "Confirm your Password",
  validate: (value: any) => value === password || "Passwords do not match",
};
