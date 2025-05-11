import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Badge, Button, Progress } from "flowbite-react"
import Chart from "react-apexcharts"
import SimpleBar from "simplebar-react"

// Componenti per il dashboard dentistico
const AppointmentsToday = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-lightprimary text-primary p-3 rounded-md">
          <Icon icon="solar:calendar-mark-line-duotone" height={24} />
        </div>
        <p className="text-lg font-semibold text-dark">Appuntamenti Oggi</p>
      </div>
      <div className="flex">
        <div className="flex-1">
          <p className="text-xl text-dark font-medium mb-2">8</p>
          <Badge className={`bg-lightsuccess text-success`}>
            +2 rispetto a ieri
          </Badge>
        </div>
      </div>
    </div>
  )
}

const NewPatients = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-lightsecondary text-secondary p-3 rounded-md">
          <Icon icon="solar:users-group-rounded-line-duotone" height={24} />
        </div>
        <p className="text-lg text-dark font-semibold">Nuovi Pazienti</p>
      </div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-dark">Questo mese</p>
        <p className="text-sm text-dark">12</p>
      </div>
      <Progress progress={75} color="secondary" />
    </div>
  )
}

const MonthlyRevenue = () => {
  const ChartData: any = {
    series: [
      {
        name: "incasso mensile",
        color: "var(--color-primary)",
        data: [3800, 3200, 4100, 3600, 3900, 4500],
      },
    ],
    chart: {
      id: "monthly-revenue",
      type: "area",
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [20, 180],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-lightsuccess text-success p-3 rounded-md">
          <Icon icon="solar:bill-list-outline" height={24} />
        </div>
        <p className="text-lg font-semibold text-dark">Incasso Mensile</p>
      </div>
      <div className="flex">
        <div className="flex-1">
          <p className="text-xl text-dark font-medium mb-2">€4.500</p>
          <Badge className={`bg-lightsuccess text-success`}>
            +15% rispetto al mese scorso
          </Badge>
        </div>
        <div className="rounded-bars flex-1 md:ps-7">
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="area"
            height="60px"
            width="100%"
          />
        </div>
      </div>
    </div>
  )
}

const UpcomingAppointments = () => {
  const AppointmentsData = [
    {
      id: 1,
      patient: "Mario Rossi",
      time: "09:30",
      treatment: "Pulizia dentale",
      doctor: "Dr. Bianchi"
    },
    {
      id: 2,
      patient: "Giulia Bianchi",
      time: "11:00",
      treatment: "Controllo ortodontico",
      doctor: "Dr. Verdi"
    },
    {
      id: 3,
      patient: "Sofia Neri",
      time: "15:30",
      treatment: "Otturazione",
      doctor: "Dr. Bianchi"
    },
    {
      id: 4,
      patient: "Marco Gialli",
      time: "10:00",
      treatment: "Estrazione",
      doctor: "Dr. Rossi"
    }
  ];

  return (
    <div className="rounded-xl shadow-md bg-white p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <h5 className="card-title">Prossimi Appuntamenti</h5>
        <Button color="primary" size="sm" as={Link} to="/appointments">
          Vedi Tutti
        </Button>
      </div>
      <SimpleBar className="max-h-[450px]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Paziente</th>
                <th scope="col" className="px-6 py-3">Ora</th>
                <th scope="col" className="px-6 py-3">Trattamento</th>
                <th scope="col" className="px-6 py-3">Dottore</th>
              </tr>
            </thead>
            <tbody>
              {AppointmentsData.map((appointment) => (
                <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{appointment.patient}</td>
                  <td className="px-6 py-4">{appointment.time}</td>
                  <td className="px-6 py-4">{appointment.treatment}</td>
                  <td className="px-6 py-4">{appointment.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SimpleBar>
    </div>
  )
}

const TreatmentStats = () => {
  const optionsBarChart: any = {
    chart: {
      type: "bar",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 315,
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: 6,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "var(--color-border)",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: [
        "Pulizia",
        "Otturazione",
        "Estrazione",
        "Radiografia",
        "Impianto",
        "Sbiancamento",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val + "";
        },
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
      marker: {
        show: true,
        size: 0,
      },
      x: {
        show: false,
      },
    },
  };

  const barChartData = {
    series: [
      {
        name: "2023",
        data: [25, 18, 12, 20, 15, 10],
      },
      {
        name: "2022",
        data: [20, 15, 10, 18, 12, 8],
      },
    ],
  };

  return (
    <div className="rounded-xl shadow-md bg-white p-6 relative w-full break-words">
      <div className="flex justify-between items-center">
        <h5 className="card-title">Statistiche Trattamenti</h5>
      </div>

      <div className="-ms-4 -me-3 mt-2">
        <Chart
          options={optionsBarChart}
          series={barChartData.series}
          type="bar"
          height="315px"
          width="100%"
        />
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-30">
      <div className="lg:col-span-8 col-span-12">
        <TreatmentStats />
      </div>
      <div className="lg:col-span-4 col-span-12">
        <div className="grid grid-cols-12 h-full items-stretch">
          <div className="col-span-12 mb-30">
            <AppointmentsToday />
          </div>
          <div className="col-span-12">
            <NewPatients />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 col-span-12">
        <UpcomingAppointments />
      </div>
      <div className="lg:col-span-4 col-span-12 flex">
        <MonthlyRevenue />
      </div>
    </div>
  )
}

export default Dashboard