import React, { useEffect, useState } from "react";
import Splitter from "./Splitter";
import { useResizable } from "react-resizable-layout";
import Add from "./Add";
import Count from "./Count";
import Text from "./Text";
import axios from "axios";
const cn = (...args) => args.filter(Boolean).join(" ");

const Layout = () => {
  const [data, setData] = useState([]);
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({ axis: "y", initial: 300, min: 50, reverse: true });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps,
  } = useResizable({ axis: "x", initial: 500, min: 50 });

  const fetchData = async () => {
    try {
      const { data } = await axios("http://localhost:8080/api/data");
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData().then((res) => setData(res));
  }, []);

  const update = async (id, text) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/data/${id}`, {
        text,
      });
      const updatedData = await fetchData();
      setData(updatedData);
      console.log("Data updated:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error updating data:", err);
      throw err;
    }
  };

  return (
    <div
      className={
        "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
      }
    >
      <div className={"flex grow"}>
        <div
          className={cn("shrink-0 contents", isFileDragging && "dragging")}
          style={{ width: fileW }}
        >
          <Add />
        </div>
        <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={"flex grow"}>
          <div className={"grow bg-darker contents"}>
            <Count />
          </div>
        </div>
      </div>
      <Splitter
        dir={"horizontal"}
        isDragging={isTerminalDragging}
        {...terminalDragBarProps}
      />
      <div
        className={cn(
          "shrink-0 bg-darker contents",
          isTerminalDragging && "dragging"
        )}
        style={{ height: terminalH }}
      >
        {data.map((data) => (
          <div key={data._id}>
            <Text text={data.text} id={data._id} update={update} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
