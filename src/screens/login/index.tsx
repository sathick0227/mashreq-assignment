import React from "react";
import { useNavigate } from "react-router-dom";
//material UI
import { Grid, Box, Typography, Stack, List, ListItem } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//Third Party Packages
import { useForm } from "react-hook-form";

//Common strings
import { ELEMENT, STRING } from "../../utils/common-strings";

//Validation schemas
import { email, password } from "../../utils/validation-rules";

//Reusable Component
import { InputBox } from "../../components/input";
import Button from "../../components/Button";
import {
  ErrorToast,
  signInWithEmailPassword,
} from "../../utils/functions";

export default function Login() {
  //Declaration
  const navigate = useNavigate();
  //States
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    signInWithEmailPassword(data.email, data.password)
      .then((res: any) => {
        sessionStorage.setItem("user", res.displayName);
        navigate("/dashboard");
      })
      .catch((err) => {
        ErrorToast(err);
      });
  };

  return (
    <Box className="container">
      <Box className="login-card">
        <Grid container>
          <Grid item xs={5} className="text-card">
            <Typography variant="h4">Welcome</Typography>
            <Typography variant="h6">to online help center!</Typography>
            <Box className="list">
              <List
                sx={{ width: "100%", minWidth: "400px", lineHeight: "0.5px" }}
              >
                <ListItem>
                  <Typography variant="body1">
                    <CheckCircleIcon className="log-prefix-icon" />
                    Secure and reliable for users
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <CheckCircleIcon className="log-prefix-icon" />
                    Even your grndma can use it
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <CheckCircleIcon className="log-prefix-icon" />
                    Works 15% faster than other
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={7} className="login-form">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid className="form">
                <Stack>
                  <InputBox
                    control={control}
                    title={STRING.EMAIL}
                    name={ELEMENT.EMAIL}
                    type={ELEMENT.EMAIL}
                    rules={email}
                    prefixIcon={<MailIcon fontSize={"small"} />}
                  />
                </Stack>
                <Stack sx={{ marginTop: "10px" }}>
                  <InputBox
                    control={control}
                    title={STRING.PASSWORD}
                    name={ELEMENT.PASSWORD}
                    type={showPassword ? ELEMENT.TEXT : ELEMENT.PASSWORD}
                    rules={password}
                    prefixIcon={<LockIcon fontSize={"small"} />}
                    suffixIcon={
                      showPassword ? (
                        <VisibilityOff onClick={() => setShowPassword(false)} />
                      ) : (
                        <Visibility onClick={() => setShowPassword(true)} />
                      )
                    }
                  />
                </Stack>
                <Stack>
                  <a style={{ display: "flex", justifyContent: "end" }}>
                    Forget Password?
                  </a>
                </Stack>
                <Grid
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "25px",
                  }}
                >
                  <Grid xs={4}>
                    <Stack>
                      <Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        value={"Log In"}
                      ></Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
