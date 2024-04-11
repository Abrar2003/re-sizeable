import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Add from "./Add";
import Count from "./Count";
import Text from "./Text";
import axios from "axios";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Layout = () => {
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({ addCount: 0, updateCount: 0 });

  const fetchData = async () => {
    try {
      const { data } = await axios(
        "https://re-sizeable-backend.onrender.com/api/data"
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCounts = async () => {
    try {
      const response = await axios.get(
        "https://re-sizeable-backend.onrender.com/api/count"
      );
      setCounts(response.data);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const handleAdd = async (text) => {
    try {
      const response = await axios.post(
        "https://re-sizeable-backend.onrender.com/api/data",
        { text }
      );
      console.log("Data added:", response.data);
      fetchData().then((res) => setData(res));
      fetchCounts();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  useEffect(() => {
    fetchData().then((res) => setData(res));
    fetchCounts();
    console.log("fetched");
  }, []);

  const handleDelete = async (id) => {
    const permission = window.confirm("Are you sure you want to delete?")
    if(permission){
      try {
        const data = await axios.delete(`http://localhost:8080/api/data/${id}`)
        console.log(data.data.message);
        const updatedData = await fetchData();
        setData(updatedData);
        fetchCounts();
        return
      } catch (error) {
        console.log("Error deleting");
        return;
      }
    }
    return;
  }
  const update = async (id, text) => {
    try {
      const response = await axios.put(
        `https://re-sizeable-backend.onrender.com/api/data/${id}`,
        {
          text,
        }
      );
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

  const [layout, setLayout] = useState([
    { i: "1", x: 0, y: 0, w: 6, h: 3, isDraggable: false },
    { i: "2", x: 6, y: 0, w: 6, h: 3, isDraggable: false },
    { i: "3", x: 0, y: 2, w: 12, h: 5, isDraggable: false },
  ]);

  const onResize = (layout, oldItem, newItem) => {
    setLayout(layout.map((item) => (item.i === oldItem.i ? newItem : item)));
  };

  const handleBodyClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ResponsiveReactGridLayout
      resizeHandles={["s", "w", "e", "n"]}
      className="layout"
      layouts={{ lg: layout }}
      onResize={onResize}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
    >
      {layout.map((item) => (
        <div
          key={item.i}
          data-grid={item}
          style={{ border: "3px solid white" }}
          onClick={(e) => handleBodyClick(e)}
        >
          <div className="resizable-content">
            {item.i === "1" ? (
              <div className="styleBox">
                {/* <Container>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                  <Button onClick={handleAdd}>Add Task</Button>
                </Container> */}
                <div className="outer">
                  <Add handleAdd={handleAdd} />
                </div>
              </div>
            ) : item.i === "2" ? (
              <div className="tasklist">
                <div
                  className={"grow bg-dark contents allData outer"}
                >
                  {data.map((data) => (
                    <Text
                      key={data._id}
                      text={data.text}
                      id={data._id}
                      update={update}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="outer">
                <Count counts={counts} />
              </div>
            )}
          </div>
        </div>
      ))}
    </ResponsiveReactGridLayout>
  );
};

export default Layout;
