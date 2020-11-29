import React from "react";

import ItemPage from "./ItemPage";

function HomePage() {

  return (
        <ItemPage />

        // <InfiniteScroll className="hero is-fullheight-with-navbar"
        //   dataLength={items.length}
        //   next={fetchMoreData}
        //   hasMore={true}
        //   loader={<h4>Loading...</h4>}
        // >
        //   {items.map((i, index) => (
        //     <div style={style} key={index}>
        //       div - #{index}
        //     </div>
        //   ))}
        // </InfiniteScroll>

  );
}

export default HomePage;