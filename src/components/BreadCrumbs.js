import React from "react";
import { Grid, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { Heading28, Heading24 } from "./CustomComponent";

const Breadcrumb = ({ root, data }) => {
  const deleteBreadcrumbEntry = (ind) => {
    const data = JSON.parse(localStorage.getItem("breadcrumb"));
    const newData = data?.slice(0, ind + 1);
    localStorage.setItem("breadcrumb", JSON.stringify(newData));
  };
  return (
    <Grid container direction="row" justifyContent="start">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        className="fs16px bold"
      >
        <Link to={root.link} style={{ textDecoration: "none" }} key="1">
          <Heading28 style={{ color: "#000" }}>{root?.label}</Heading28>
        </Link>
        {data?.map((ele, ind) => (
          <Link
            to={`/${ele.link}`}
            style={{ textDecoration: "none" }}
            key={ind}
            onClick={() => deleteBreadcrumbEntry(ind)}
          >
            <Heading24
              style={{
                color: `${data?.length === ind + 1 ? "#A7A7A7" : "#000"}`,
                fontWeight: "400",
              }}
            >
              {" "}
              {ele.label}
            </Heading24>
          </Link>
        ))}
      </Breadcrumbs>
    </Grid>
  );
};

export default Breadcrumb;
