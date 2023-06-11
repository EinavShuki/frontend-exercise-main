import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/LayoutComponent/Layout";
import Card from "../components/Card/Card";
import Filters from "../components/Filters/Filters";
import Results from "../components/Results/Results";
import MainResult from "../components/MainResult/MainResult";
import useFetch from "../hooks/useFetch";
import _ from "lodash";
import Loading from "../components/Loading/Loading";

const ITEMS_PER_PAGE = 4;

function HomeScreen() {
  const { data, isLoading } = useFetch("api/issues");

  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  useEffect(() => {
    if (!selectedItem) {
      setSelectedItem(items[0]);
    }
  }, [items]);

  const resetState = useCallback(() => {
    data && setSelectedItem(data[0]);
    setPage(0);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Card style={{ gridColumn: "1 / 3" }}>
              <Filters
                data={data}
                setItems={setItems}
                resetState={resetState}
              />
            </Card>
            <Card>
              <Results
                page={page}
                items={items}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                itemsPerPage={ITEMS_PER_PAGE}
              />
              <div style={{ display: "flex", gap: "5px" }}>
                {_.map(
                  Array.from({
                    length: Math.ceil(_.size(items) / ITEMS_PER_PAGE),
                  }),
                  (_, index) => {
                    return (
                      <div
                        key={index}
                        className="pagination"
                        onClick={() => setPage(index)}
                      >
                        {index + 1}
                      </div>
                    );
                  }
                )}
              </div>
            </Card>
            <Card>{selectedItem && <MainResult item={selectedItem} />}</Card>
          </>
        )}
      </Layout>
    </div>
  );
}

export default HomeScreen;
