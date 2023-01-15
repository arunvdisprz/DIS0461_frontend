import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import Moment from "moment";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart",
    // },
  },
};

function ChartForYear() {
  const value = useContext(Requiredvalue);
  var selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy" + "-01-01T00:00:00"
  );
  var selectedDateEnd = Moment(value.appointmentDate).format(
    "yyyy" + "-01-31T00:00:00"
  );

  var noOfMeetingYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var durationOfYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  {
    Array.from({ length: 12 }).map((_, index) => {
      value.allAppointment
        .filter(
          (appointment) =>
            Moment(appointment.appointmentDate).format("yyyy-MM-DDT") >=
              Moment(selectedDateStart)
                .add(index, "months")
                .format("yyyy-MM-DDT") &&
            Moment(appointment.appointmentDate).format("yyyy-MM-DDT") <=
              Moment(selectedDateEnd).add(index, "months").format("yyyy-MM-DDT")
        )
        .map((appointment1) => {
          noOfMeetingYear[index]++;
          durationOfYear[index] =
            durationOfYear[index] +
            Moment(appointment1.appointmentEndTime).diff(
              appointment1.appointmentStartTime,
              "hours"
            );
        });
    });
    console.log(durationOfYear);
  }

  const dataNumber = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "No of Meeting",
        data: noOfMeetingYear,
        backgroundColor: "#1fcf94",
      },
    ],
  };

  const durationData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "duration of meeting",
        data: durationOfYear,
        backgroundColor: "#1fcf94",
      },
    ],
  };

  return (
    <div className="ChartForYear">
      <Bar
        options={options}
        data={dataNumber}
        className="ChartForYear--chart "
      />
      <Line
        options={options}
        data={durationData}
        className="ChartForYear--chart "
      />
    </div>
  );
}

export default ChartForYear;
// durationOfYear[index]+
