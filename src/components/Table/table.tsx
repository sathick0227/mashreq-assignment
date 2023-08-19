import React, { useState } from "react";
import { Modal, Box, Grid } from "@mui/material";
import Button from "../Button";
import { COLORS } from "../../utils/common-strings";

import { ErrorToast, SuccessToast } from "../../utils/functions";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../config/firebaseConfig";
import MaterialTable from "material-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Form from "../Form";
const modalbox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "500px",
  height: "auto",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 0,
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

type props = {
  rows: any[];
};

const Table: React.FC<props> = ({ rows }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<any>();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [id, setId] = useState<any>();

  const TableHead = [
    { field: "id", title: "ID" },
    { field: "firstname", title: "First name" },
    { field: "middlename", title: "Middle name" },
    { field: "lastname", title: "Last name" },
    { field: "email", title: "Username" },
  ];

  const handleDelete = () => {
    try {
      const users = doc(firestore, "user", id);
      deleteDoc(users);
      SuccessToast("Document deleted successfully");
    } catch (error) {
      ErrorToast("Error deleting documents");
    }
  };

  const handleConfirm = (id: string) => {
    setConfirmDelete(true);
    setId(id);
  };

  const handleEdit = (data: any) => {
    setCurrentData(data);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <Modal open={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <Box sx={modalbox}>
            {currentData && (
              <Form
                handleClose={handleClose}
                datas={currentData}
                flag={"edit"}
              />
            )}
          </Box>
        </Modal>
        <Modal
          open={confirmDelete}
          onClose={() => setConfirmDelete(!confirmDelete)}
        >
          <Box sx={style1}>
            <h4>Are you sure you want to delete this record?</h4>
            <Grid
              sx={{ display: "flex", justifyContent: "end", columnGap: "10px" }}
              spacing={2}
            >
              <Button
                type={"button"}
                color={COLORS.ERROR}
                value={"No"}
                onClick={() => setConfirmDelete(!confirmDelete)}
              />

              <Button
                type={"button"}
                color={COLORS.PRIMARY}
                onClick={() => handleDelete()}
                value={"Yes"}
              />
            </Grid>
          </Box>
        </Modal>
        {/* <DataGrid
          rows={rows.rows}
          columns={TableHead}
          pageSizeOptions={[0, 5, 25, 50]}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        /> */}
        <MaterialTable
          title="User Data"
          data={rows}
          columns={TableHead}
          actions={[
            {
              icon: () => <EditIcon sx={{ color: COLORS.PRIMARY }} />,
              tooltip: "Edit User",
              onClick: (event, rowData) => {
                handleEdit(rowData);
              },
            },
            {
              icon: () => <DeleteIcon sx={{ color: COLORS.ERROR }} />,
              tooltip: "Delete User",
              onClick: (event, rowData) => {
                handleConfirm(rowData.id);
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </div>
    </>
  );
};

export default Table;
