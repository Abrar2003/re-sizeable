import React from 'react'
import GridLayout from "react-grid-layout";

function NewLayout() {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 3, h: 2 },
        { i: "c", x: 4, y: 0, w: 1, h: 2 }
      ];
      return (
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={window.innerWidth}
        >
          <div className='components' key="a">a</div>
          <div className='components' key="b">b</div>
          <div className='components' key="c">c</div>
        </GridLayout>
      );
}

export default NewLayout