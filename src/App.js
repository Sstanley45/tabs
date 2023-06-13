import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./Loading";
import { FaAngleDoubleRight } from "react-icons/fa";

function App() {
  const url = "https://course-api.com/react-tabs-project";

  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [jobs, setJobs] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const { title, dates, duties, company } = jobs[value];

  return (
    <div className="App section">
      <h1 style={{ textAlign: "center" }}>Experience</h1>
      <div className="underline"></div>
      <div className="jobs-center">
        <div className="btn-div">
          {jobs.map((job, index) => {
            return (
              <>
                <div key={job.id}>
                  <button
                    className={`btn ${index === value && "active-btn"}`}
                    onClick={() => setValue(index)}
                  >
                    {job.company}
                  </button>
                </div>
              </>
            );
          })}
        </div>
        <section className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
        </section>
        <div></div>
        <article>
          {duties.map((duty, i) => {
            return (
              <div key={i} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p> {duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </div>
  );
}

export default App;
