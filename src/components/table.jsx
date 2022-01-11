import React from "react";
import Button from "./button";

const Table = ({ posts, onUpdate, onDelete }) => {
  return (
    <table className="table my-3">
      <thead>
        <tr>
          <td>
            <b>Tasks</b>
          </td>
          <td align="right">
            <b>Update &nbsp; &nbsp; Delete &nbsp;</b>
          </td>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>
              <p className="m-0 pt-2">{post.name}</p>
            </td>
            <td align="right">
              <Button
                className={"btn btn-info btn-sm m-1"}
                onClick={() => onUpdate(post)}
                text={"Update"}
              />

              <Button
                className={"btn btn-danger btn-sm m-1"}
                onClick={() => onDelete(post)}
                text={"Delete"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
