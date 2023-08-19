import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import { Modal, Grid, Box } from "@mui/material";
import Table from "../../components/Table/table";
import { getUser } from "../../service/service";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "../../components/Button";
import { COLORS } from "../../utils/common-strings";
import Form from "../../components/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "../../utils/functions";

const container = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#fffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const modalbox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "550px",
  height: "auto",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 0,
};
export default function Dashboard() {
  const {
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    getUser()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        ErrorToast(err);
      });
  }, []);
  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <Box sx={modalbox}>
          <Form handleClose={handleClose} />
        </Box>
      </Modal>
      <Header />

      <Grid sx={container}>
        <Grid>
          {data ? (
            <>
              <Button
                style={{ display: "flex", marginTop: "20px" }}
                color={COLORS.SUCCESS}
                onClick={() => setIsOpen(true)}
                value={"Add New User"}
              />
              <br />
              <Table rows={data ? data : []} />
            </>
          ) : (
            <Box>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
