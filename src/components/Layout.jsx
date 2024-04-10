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
  const [counts, setCounts] = useState({ addCount: 0, updateCount: 0 });
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
      const { data } = await axios("https://re-sizeable-backend.onrender.com/api/data");
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };


  const fetchCounts = async () => {
    try {
      const response = await axios.get('https://re-sizeable-backend.onrender.com/api/count');
      setCounts(response.data);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };


  const handleAdd = async (text) => {
    try {
      const response = await axios.post('https://re-sizeable-backend.onrender.com/api/data', { text });
      console.log('Data added:', response.data);
      fetchData().then((res) => setData(res));
      fetchCounts();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  useEffect(() => {
    fetchData().then((res) => setData(res));
    fetchCounts();
  }, []);

  const update = async (id, text) => {
    try {
      const response = await axios.put(`https://re-sizeable-backend.onrender.com/api/data/${id}`, {
        text,
      });
      const updatedData = await fetchData();
      setData(updatedData);
      fetchCounts();
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
          <Add handleAdd={handleAdd} />
        </div>
        <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={"flex grow"}>
          <div className={"grow bg-darker contents"}>
            <Count counts={counts} />
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
          isTerminalDragging && "dragging",
          "allData"
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
