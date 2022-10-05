import React, { useEffect, useState } from "react";
import "./sass/main.scss";
import Loading from "./components/loading";
import Table from "./components/Table";

function App() {
  const TableLoading = Loading(Table);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
  const [searchWords, setSearchWords] = useState("");
  console.log(searchWords)


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({keys: searchWords});

    const searchItems = (data) => {
      setSearchWords(data)
    };    
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };  

    const apiUrlPost = `http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetFilteredDebts`;
      const fetchDataPost = async () => {
        fetch(apiUrlPost, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setAppState({ ...appState, repos: result });
            })
          .then((result) => console.log("result", result))
          .catch((error) => console.log("error", error));
          console.log('render fetchdatapost')
      };
     
      const handleSubmit = (e) => {
        e.preventDefault();
        fetchDataPost();
        console.log('searchwords', searchWords)
      }

      const handleChange = (e) => {
        e.preventDefault()
        searchItems(e.target.value)
      }
      
  
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetTopDebts`;
    const fetchData = async () => {
      fetch(apiUrl, { method: "GET" })
        .then((res) => res.json())
        .then((repos) => {
          setAppState({ loading: false, repos: repos });
        })
        .catch((e) => console.error(e));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);
    
    console.log("useeffect runs")
    
    return () => {
      clearTimeout(timer);
    }
  }, [setAppState]);

  return (
    <div className="wrap">
      <div className="header">
        <div className="header__wrap">
          <h2 className="form__label">Provide tax number or the name</h2>
          {console.log('render app runs')}
          <form className="form__wrap" onSubmit={handleSubmit}>              
                <input
                  id="input11"
                  className="form__input"
                  placeholder="Search..."
                  type="text"
                  value={searchWords}
                  onChange={handleChange}
                />
                <button className="form__search-button" type="submit">
                Search
              </button>             
            </form>
        </div>
      </div>
      <div className="container">
        {appState.repos && (
          <TableLoading
            isLoading={appState.loading}
            repos={appState.repos}
          />
        )}
      </div>
    </div>
  );
}
export default App;
