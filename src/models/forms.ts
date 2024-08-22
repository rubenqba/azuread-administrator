export type FieldError = {
  path: string;
  message: string;
};

export type FormSuccessState = {
  status: "success";
  message: string;
};
export type FormErrorState = {
  status: "error";
  message: string;
  errors?: FieldError[];
};

export type FormStatus = FormSuccessState | FormErrorState;
