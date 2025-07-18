import React from "react";

export const link = (url: string, rowData: any, linkName: string, icon?: any, onClick?: any) => {
  return (
    <a
      href={url}
      onClick={(e) => {
        e.preventDefault(); // Prevent navigation if onClick is provided
        if (onClick) onClick(rowData); 
      }}
      style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
    >
      {icon && <i className={`${icon}`} style={{ marginRight: "8px" }}></i>}
      {linkName}
    </a>
  );
};