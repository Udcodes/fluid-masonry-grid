import "./app.scss";
import SelectField from "./components/selectField/SelectField";
import Card from "./components/card/Card";
import { useEffect, useState, useCallback, memo } from "react";
import axios from "axios";
import { uniqueValues } from "./util";

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedValue, setSelectedValue] = useState(30);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [error, setError] = useState("");

  const onImageClick = (index) => {
    if (!index) {
      return null;
    } else {
      setActiveIndex(index);
      setIsFlipped(!isFlipped);
    }
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    filterData(selectedValue);
  };

  const fetchData = useCallback(
    async (page) => {
      try {
        let response = await axios.get(
          `https://picsum.photos/v2/list?page=${page}&limit=10`
        );

        if (page === 1) {
          setDataArr(response?.data);
        } else {
          let resultsArr = [...dataArr, ...response?.data];
          setDataArr(resultsArr);
        }
      } catch (error) {
        setError("An error occurred with this request");
      }
      setLoadingMore(false);
    },
    [dataArr]
  );

  const filterData = (value) => {
    switch (value) {
      case 20:
        setPageNumber(2);
        fetchData(2);
        break;
      case 30:
        setPageNumber(3);
        fetchData(3);
        break;
      case 40:
        setPageNumber(4);
        fetchData(4);
        break;
      case 50:
        setPageNumber(5);
        fetchData(5);
        break;
      default:
        setPageNumber(1);
        fetchData(1);
        break;
    }
  };

  const handleScroll = useCallback(() => {
    if (!dataArr.length) {
      return;
    }

    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;

    if (documentHeight === currentScroll && dataArr.length < selectedValue) {
      setLoadingMore(true);
      fetchData(selectedValue);
    }
  }, [dataArr?.length, selectedValue, fetchData]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  if (error) return error;

  return (
    <div className="app">
      <div className="drop-down">
        <SelectField value={selectedValue} onChange={handleChange} />
      </div>
      <main className="main-container">
        <div className="photo-list">
          {!!uniqueValues(dataArr)
            ? uniqueValues(dataArr)?.map(
                ({ id, url, download_url, author }) => (
                  <Card
                    key={id}
                    content={{
                      author,
                      imgSrc: download_url,
                      link: url,
                      isFlipped: activeIndex === id && isFlipped,
                    }}
                    onClick={() => {
                      onImageClick(id);
                    }}
                  />
                )
              )
            : null}
        </div>
        {loadingMore ? <p className="loading-more">Loading more...</p> : null}
      </main>
    </div>
  );
};

export default memo(App);
