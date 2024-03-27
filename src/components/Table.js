import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import TabPane from "./TabPane";

export default function CustomTable({
  headBackgroundColor,
  tableHeadData,
  tableRowData,
  bgColor,
  paneText,
  btnText,
  onClick,
  alertIndex
}) {
  const TableCellHead = styled(TableCell)({
    background: headBackgroundColor,
    color: "#fff",
    fontSize: 15,
  });

  const TableCellBody = styled(TableCell)({ fontSize: 15 });

  const lastItemAlignment = (ind) =>
    tableHeadData?.length === ind + 1 ? "right" : null;
  const itemAlignment = (ind) =>
    tableHeadData?.length > 2 ? "center" : lastItemAlignment(ind);

  const getStyle = (eleIndex) => {
    if (alertIndex?.includes(eleIndex)) return { color: "#DC1818", fontWeight: 500 };
    else return { color: "black" };
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 0,
        width: "100%",
      }}
    >
      {
        paneText?(
          <Box p="4px 16px">
          <TabPane
            paneText={paneText}
            paneTextColor="#000"
            btnText={btnText}
            onBtnClick={onClick}
          />
        </Box>
        ):null
      }
    
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadData &&
              tableHeadData
                ?.map((col, ind) => (
                  <TableCellHead
                    key={col}
                    sx={{
                      textAlign: `${itemAlignment(ind)}`,
                      textTransform: "capitalize",
                      color: "#000",
                      fontWeight: 500,
                    }}
                  >
                    {col}
                  </TableCellHead>
                ))
                .filter((count) => count != 0)}
          </TableRow>
        </TableHead>
        <TableBody className={`${bgColor}`}>
          {tableRowData?.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                overflow: "hidden",
              }}
            >
              {Object.values(row)
                ?.filter((el) => el !== null && !el?.toString()?.includes("id"))
                ?.map((ele, ind) => (
                  <TableCellBody
                    component="th"
                    scope="row"
                    sx={{
                      textAlign: `${itemAlignment(ind)}`,
                      ...getStyle(ind)
                    }}
                  >
                    {!Array.isArray(ele) ? (
                      ele
                    ) : (
                      <Box>{ele?.map((btn) => btn)}</Box>
                    )}
                  </TableCellBody>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
