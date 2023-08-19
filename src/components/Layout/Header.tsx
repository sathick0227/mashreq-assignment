import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, Modal, Box } from "@mui/material";
import { styled } from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utils/common-strings";
import Button from "../Button";

const StyledAppBar = styled(AppBar)`
  position: sticky;
  top: 0;
  background-color: #0c356a !important;
`;
const style = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0px 10px 0px",
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 0,
  width: "32%",
  padding: "30px",
};

const Header: React.FC = () => {
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState<boolean>(false);

  const handleLogout = () => {
    navigate("/");
    sessionStorage.clear();
  };

  return (
    <StyledAppBar>
      <Modal open={confirm} onClose={() => setConfirm(!confirm)}>
        <Box sx={style1}>
          <h4>Are you sure you want to logout</h4>
          <Grid
            sx={{ display: "flex", justifyContent: "end", columnGap: "10px" }}
            spacing={2}
          >
            <Button
              type={"button"}
              color={COLORS.ERROR}
              value={"No"}
              onClick={() => setConfirm(!confirm)}
            />

            <Button
              type={"button"}
              color={COLORS.PRIMARY}
              onClick={() => handleLogout()}
              value={"Yes"}
            />
          </Grid>
        </Box>
      </Modal>
      <Toolbar>
        <Grid container sx={style}>
          <Grid item xs={10}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Mashreq
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" sx={{ color: "white" }}>
              {user === "null" ? "" : user}
            </Typography>
          </Grid>
          <Grid xs={1} item sx={{ marginTop: "5px" }}>
            <a href="" onClick={() => setConfirm(true)}>
              <LogoutIcon sx={{ color: "white" }} />
            </a>
          </Grid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
