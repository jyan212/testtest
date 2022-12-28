import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

type TableDataTypes = string[][];

const processTable = (data: string): TableDataTypes => {
  /*
    Process the CSV data from string by splitting its delimiter (,) and newline (\r\n)
  */

  let processedDataArr = data.split("\r\n"); // split data by newline

  let processedData = [];
  for (let row of processedDataArr) {
    processedData.push(row.split(",")); // split row data by delimiter (,)
  }

  return processedData;
};

export default function Home({ props }: any) {
  const { data } = props;
  console.log(data);
  const rowId = ["Alpha", "Beta", "Charlie"];
  return (
    <div className="container-fluid">
      <h1>MULAH ASSESSMENT - JUN YAN </h1>
      <h2>Table 1</h2>
      <table
        className="table table-striped table-bordered"
        style={{
          width: "30%",
        }}
      >
        <thead className="thead-dark">
          <tr>
            <th>{data[0][0]}</th>
            <th>{data[0][1]}</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((row: string[], index: number) => {
              return index !== 0; // filter the header
            })
            .map((row: string[], i: number) => {
              const c1 = row[0]; // extract the row value (column 1 and column 2)
              const c2 = row[1];
              return (
                <tr key={i}>
                  <td>{c1}</td>
                  <td>{c2}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <h2>Table 2</h2>
      <table
        className="table table-striped table-bordered"
        style={{
          width: "30%",
        }}
      >
        <thead className="thead-dark">
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rowId.map((row: string, i: number) => {
            const c1 = row;
            const c2 =
              i == 0
                ? parseInt(data[5][1]) + parseInt(data[20][1]) // A5 + A20
                : i == 1
                ? parseInt(data[15][1]) / parseInt(data[7][1]) // A15 / A7
                : parseInt(data[13][1]) * parseInt(data[12][1]); // A13 * A12
            return (
              <tr key={i}>
                <td>{c1}</td>
                <td>{c2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface HomeInitialProps {
  data: any;
}

// Get Initial server data
Home.getInitialProps = async (
  context: any
): Promise<{ props: HomeInitialProps }> => {
  // Fetching csv file from server file
  try {
    const data = await axios.get(`http://localhost:3000/Table_Input.csv`);
    console.log('successfully retrieved data"', data);
    const processedData = processTable(data.data);

    return {
      props: {
        data: processedData,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    const data = [[]];
    console.log(err);

    return {
      props: {
        data: data,
      }, // will be passed to the page component as props
    };
  }
};
