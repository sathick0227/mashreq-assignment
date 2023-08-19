import React, { FC } from "react";
//material UI
import { Grid, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//Third Party Packages
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebaseConfig";

//Common strings
import { COLORS, ELEMENT, STRING } from "../../utils/common-strings";

//Validation schemas
import {
  email,
  password,
  firstname,
  lastname,
} from "../../utils/validation-rules";

//Reusable Component
import { InputBox } from "../input";
import Button from "../Button";
import {
  ErrorToast,
  SuccessToast,
  signUpWithEmailPassword,
} from "../../utils/functions";
import { addUser } from "../../service/service";
type FormProp = {
  datas?: any;
  handleClose: () => void;
  flag?: string;
};
const Form: FC<FormProp> = ({ handleClose, datas, flag }) => {
  //States
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (flag !== "edit") {
      if (data.middlename === undefined) {
        data.middlename = "";
        console.log("hi");
      }
      addUser(data)
        .then((res) => {
          SuccessToast("User Created Successfully");
        })
        .catch((err) => {
          ErrorToast(err);
        });
      signUpWithEmailPassword(data.email, data.password, data.firstname)
        .then((res: any) => {
          console.log(data);

          handleClose();
        })
        .catch((err) => {
          ErrorToast(err);
        });
    } else {
      const updateUser = doc(firestore, "user", datas.id);
      try {
        await updateDoc(updateUser, data);
        SuccessToast("Document updated successfully");
      } catch (error: any) {
        ErrorToast("Error updating document");
      }
    }
  };

  const handleReset = () => {
    reset();
    setValue(ELEMENT.FIRSTNAME, "");
    setValue(ELEMENT.LASTNAME, "");
    setValue(ELEMENT.MIDDLENAME, "");
    setValue(ELEMENT.EMAIL, "");
    setValue(ELEMENT.PASSWORD, "");
    setValue(ELEMENT.CONFIRM, "");
  };

  return (
    <Grid item xs={7} className="login-form">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid className="form">
          <h3 style={{ color: "black", textAlign: "center" }}>
            {flag === "edit" ? "Edit User" : "Add New User"}
          </h3>
          <Stack>
            <InputBox
              control={control}
              title={STRING.FIRSTNAME}
              name={ELEMENT.FIRSTNAME}
              type={ELEMENT.TEXT}
              rules={firstname}
              // value={getValues(ELEMENT.FIRSTNAME)}
              defaultValue={datas?.firstname}
            />
          </Stack>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Stack sx={{ marginTop: "20px" }}>
                <InputBox
                  control={control}
                  title={STRING.MIDDLENAME}
                  name={ELEMENT.MIDDLENAME}
                  type={ELEMENT.TEXT}
                  defaultValue={datas?.middlename}
                  // value={getValues(ELEMENT.MIDDLENAME)}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ marginTop: "20px" }}>
                <InputBox
                  control={control}
                  title={STRING.LASTNAME}
                  name={ELEMENT.LASTNAME}
                  type={ELEMENT.TEXT}
                  rules={lastname}
                  defaultValue={datas?.lastname}
                  // value={getValues(ELEMENT.LASTNAME)}
                />
              </Stack>
            </Grid>
          </Grid>

          <Stack sx={{ marginTop: "20px" }}>
            <InputBox
              control={control}
              title={STRING.EMAIL}
              name={ELEMENT.EMAIL}
              type={ELEMENT.EMAIL}
              defaultValue={datas?.email}
              // value={getValues(ELEMENT.EMAIL)}
              rules={email}
            />
          </Stack>
          {flag !== "edit" && (
            <>
              <Stack sx={{ marginTop: "20px" }}>
                <InputBox
                  control={control}
                  title={STRING.PASSWORD}
                  name={ELEMENT.PASSWORD}
                  type={showPassword ? ELEMENT.TEXT : ELEMENT.PASSWORD}
                  rules={password}
                  // value={getValues(ELEMENT.PASSWORD)}
                  style={{ padding: "0px" }}
                  suffixIcon={
                    showPassword ? (
                      <VisibilityOff
                        sx={{ fontSize: 20 }}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Visibility
                        sx={{ fontSize: 20 }}
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                />
              </Stack>
              <Stack sx={{ marginTop: "20px" }}>
                <InputBox
                  control={control}
                  title={STRING.CONFIRM}
                  name={ELEMENT.CONFIRM}
                  type={showPassword2 ? ELEMENT.TEXT : ELEMENT.PASSWORD}
                  rules={{
                    required: "Confirm your Password",
                    validate: (value: any) =>
                      value === getValues(ELEMENT.PASSWORD) ||
                      "Passwords do not match",
                  }}
                  // onChange={handleConfirmPasswordChange}
                  style={{ padding: "0px" }}
                  suffixIcon={
                    showPassword2 ? (
                      <VisibilityOff
                        sx={{ fontSize: 20 }}
                        onClick={() => setShowPassword2(false)}
                      />
                    ) : (
                      <Visibility
                        sx={{ fontSize: 20 }}
                        onClick={() => setShowPassword2(true)}
                      />
                    )
                  }
                />
              </Stack>
            </>
          )}

          <Grid
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              marginTop: "25px",
            }}
          >
            <Grid container xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <Stack>
                  <Button
                    type="submit"
                    color={COLORS.SUCCESS}
                    onClick={handleSubmit(onSubmit)}
                    value={flag === "edit" ? "Update" : "Add User"}
                  ></Button>
                </Stack>

                <Stack>
                  <Button
                    type={"button"}
                    color={COLORS.ERROR}
                    onClick={handleReset}
                    value={"Clear"}
                  ></Button>
                </Stack>
                <Stack>
                  <Button
                    type="submit"
                    onClick={handleClose}
                    value={"Close"}
                  ></Button>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Form;
