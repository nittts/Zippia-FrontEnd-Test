import axios from "axios";
import { useEffect, useState } from "react";
import { ICardData, IJob, IRequestData } from "../../@types/job.types";

import styles from "../../styles/main.module.css";

import Card from "../../components/Card";
import Filter from "../../components/Filter";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Head from "next/head";

export default function Main() {
  const [data, setData] = useState<IRequestData>({} as IRequestData);

  // Initial Payload for the request as stated
  const [payload, setPayload] = useState({
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 10,
    previousListingHashes: [],
  });

  // Control Variable to process loading during API fetch
  const [loading, setLoading] = useState(true);

  // Small function to fetch more jobs as the user progresses
  const fetchData = () => {
    setLoading(true);
    setPayload({ ...payload, numJobs: payload.numJobs + 10 });
    setData({ ...data, jobs: [] });
  };

  // Coompare Function to filter between names and dates
  const sortFn = (type: string) => {
    if (type === "name") {
      const sortedData = data.jobs.sort((jobA: any, jobB: any) => jobA.jobTitle.localeCompare(jobB.jobTitle));
      console.log(sortedData);
      setData({ ...data, jobs: sortedData });
    }

    if (type === "recent") {
      const sortedData = data.jobs.filter((job) => {
        return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) < new Date(job.OBJpostingDate as string);
      });
      setData({ ...data, jobs: sortedData });
    }
  };

  useEffect(() => {
    //Post requesting data and turning off loading stage when completed
    axios.post("https://www.zippia.com/api/jobs/", payload).then((res) => {
      setLoading(false);
      setData(res.data);
    });
  }, [payload]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home - Zippia Test</title>
      </Head>

      <div className={styles.container}>
        <Header />
        <h1>DEVELOPER JOBS NEAR ME - {data.totalJobs} JOBS</h1>
        <Filter sortFn={sortFn} />
        <div className={styles.cardsContainer}>
          {loading ? (
            <Loading />
          ) : (
            <>
              {
                // Map through all the jobs listed on Jobs[], rendering the component card with their info
                data.jobs &&
                  data.jobs.map((singleJob, index) => {
                    // Destructure of the Job Object, searching for the requested Params plus extra info
                    const { jobTitle, companyName, jobDescription, companyLogo, postedDate, estimatedSalary } =
                      singleJob;

                    // Scope Declaring types to match prop typing
                    const data: ICardData = {
                      jobTitle: jobTitle as string,
                      companyName: companyName as string,
                      jobDesc: jobDescription as string,
                      companyLogo: companyLogo as string,
                      postedDate: postedDate as string,
                      estimatedSalary: estimatedSalary as string,
                    };
                    return <Card data={data} key={`${index}`} />;
                  })
              }
            </>
          )}
        </div>
        <button onClick={fetchData}>Load More</button>
      </div>
    </>
  );
}
