import { getDataBySlug } from "@/utils/getData";
import { Line } from "react-chartjs-2";
import {
  CalendarIcon,
  GlobeAsiaAustraliaIcon,
  ArchiveBoxIcon,
  CircleStackIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  QueueListIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/formateDate";
import {
  CPUChart,
  DiskChart,
  FwAllow,
  FwBlocked,
  FwRequests,
  MemoryChart,
  S3HitsChart,
  S3ObjectsChart,
  S3SizeChart,
} from "@/components/Bar";

const EC2Details = ({ filteredData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 title="EC2 Instance name" className="text-3xl font-semibold">
          {filteredData.name}
        </h1>
        <div
          title="Creation Date"
          className="flex gap-2 text-sm text-gray-500 items-center"
        >
          <CalendarIcon className="h-5 w-5"></CalendarIcon>{" "}
          {formatDate(filteredData.createdAt)}
        </div>
      </div>

      <div className="text-gray-600 mb-2 flex gap-2 items-center">
        <div title="Size of EC2" className="flex gap-2 items-center">
          <CpuChipIcon className="h-5 w-5"></CpuChipIcon>
          {filteredData.type}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">IP Addresses:</h2>
        <ul>
          {filteredData.ipAddresses.map((ipObj, index) => (
            <li key={index} className="mb-1">
              IP: {ipObj.ip}{" "}
              {ipObj.isPrimary && (
                <span className="text-blue-500">(Primary)</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Specifications:</h2>

        <div className="flex gap-2 items-center" title="CPU">
          <CpuChipIcon className="h-5 w-5"></CpuChipIcon>{" "}
          <p className="text-gray-600">{filteredData.specs.cpu}</p>
        </div>

        <div className="flex gap-2 items-center" title="Memory">
          <QueueListIcon className="h-5 w-5"></QueueListIcon>{" "}
          <p className="text-gray-600">{filteredData.specs.memory} MB</p>
        </div>

        <div className="flex gap-2 items-center" title="Disk">
          <CircleStackIcon className="h-5 w-5"></CircleStackIcon>{" "}
          <p className="text-gray-600">{filteredData.specs.disk} MB</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Usage Over Time:</h2>
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-4">
          <div className="flex-1">
            <CPUChart usageData={filteredData.usage} />
          </div>
          <div className="flex-1">
            <MemoryChart usageData={filteredData.usage} />
          </div>
          <div className="flex-1">
            <DiskChart usageData={filteredData.usage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const S3Details = ({ filteredData }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 title="S3 Instance name" className="text-3xl font-semibold">
          {filteredData.name}
        </h1>
        <div
          title="Creation Date"
          className="flex gap-2 text-sm text-gray-500 items-center"
        >
          <CalendarIcon className="h-5 w-5"></CalendarIcon>{" "}
          {formatDate(filteredData.createdAt)}
        </div>
      </div>
      <div className="text-gray-600 mb-2 flex gap-2 items-center">
        <div title="Size of EC2" className="flex gap-2 items-center">
          <ServerStackIcon className="h-5 w-5"></ServerStackIcon>
          {filteredData.type}
        </div>
      </div>
      <div
        className="text-sm text-gray-500 mt-2 flex gap-2 items-center"
        title="Region"
      >
        <GlobeAsiaAustraliaIcon className="h-5 w-5"></GlobeAsiaAustraliaIcon>{" "}
        {filteredData.specs.region}
      </div>
      <p
        className="text-sm text-gray-500 flex gap-2 mt-2 items-center"
        title="Max Objects"
      >
        <ExclamationTriangleIcon className="h-5 w-5"></ExclamationTriangleIcon>{" "}
        {filteredData.specs.maxObjects}
      </p>

      <p
        className="text-sm text-gray-500 mt-2 flex gap-2 items-center"
        title="Max Size"
      >
        <CircleStackIcon className="h-5 w-5"></CircleStackIcon>
        {filteredData.specs.maxSize} MB
      </p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Usage Over Time:</h2>
        <div className="flex max-md:flex-col gap-4">
          <div className="flex-1">
            <S3ObjectsChart usageData={filteredData.usage} />
          </div>
          <div className="flex-1">
            <S3HitsChart usageData={filteredData.usage} />
          </div>
          <div className="flex-1">
            <S3SizeChart usageData={filteredData.usage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const FirewallDetails = ({ filteredData }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 title="Firewall Instance name" className="text-3xl font-semibold">
          {filteredData.name}
        </h1>
        <div
          title="Creation Date"
          className="flex gap-2 text-sm text-gray-500 items-center"
        >
          <CalendarIcon className="h-5 w-5"></CalendarIcon>{" "}
          {formatDate(filteredData.createdAt)}
        </div>
      </div>
      <p
        className="mb-2 flex gap-2 text-base text-gray-500 items-center"
        title="Type"
      >
        <ShieldCheckIcon className="h-5 w-5"></ShieldCheckIcon>{" "}
        {filteredData.type}
      </p>
      <p
        className="text-sm text-gray-500 mt-2 flex gap-2 items-center"
        title="Max IPv4 Rules"
      >
        Max IPV4 Rules: {filteredData.specs.maxIpv4Rules}
      </p>

      <p
        className="text-sm text-gray-500 flex gap-2 items-center"
        title="Max IPv6 Rules"
      >
        Max IPV6 Rules: {filteredData.specs.maxIpv6Rules}
      </p>
      <h2 className="text-xl font-semibold mb-2 pt-4">FireWall Rules</h2>
      <ul className="space-y-4">
        {filteredData.rules.map((rule, index) => (
          <li
            key={index}
            className="border p-4 rounded shadow-md bg-white hover:shadow-lg"
            title={`Rule ${index + 1}`}
          >
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <div>
                <p className="text-gray-600">IP: {rule.ip}</p>
                <p className="text-gray-600">Type: {rule.type}</p>
                <p
                  className={`text-${
                    rule.verdict === "ALLOW" ? "green" : "red"
                  }-600`}
                >
                  Verdict: {rule.verdict}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Port: {rule.port}</p>
                <p className="text-gray-600">Description: {rule.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-6 pt-4">
        <h2 className="text-xl font-semibold mb-2">Usage Over Time:</h2>
        <div className="flex max-md:flex-col gap-4">
          <div className="flex-1">
            <FwAllow usageData={filteredData.usage} />
          </div>
          <div className="flex-1">
            <FwBlocked usageData={filteredData.usage} />
          </div>
          <div className="flex-1">
            <FwRequests usageData={filteredData.usage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = async (props) => {
  const data = await getDataBySlug(props.params.group);
  const filteredData = await data.services.find(
    (item) => item.slug === props.params.services
  );

  if (
    filteredData.type === "MINI" ||
    filteredData.type === "LARGE" ||
    filteredData.type === "SMALL" ||
    filteredData.type === "XLARGE" ||
    filteredData.type === "MEGA"
  ) {
    return <EC2Details filteredData={filteredData} />;
  } else if (
    filteredData.type === "ARCHIVE" ||
    filteredData.type === "COLD" ||
    filteredData.type === "HOT" ||
    filteredData.type === "CDN"
  ) {
    return <S3Details filteredData={filteredData} />;
  } else if (
    filteredData.type === "IPV4" ||
    filteredData.type === "IPV6" ||
    filteredData.type === "IPV64"
  ) {
    return <FirewallDetails filteredData={filteredData} />;
  } else {
    return <div>Something Went Wrong</div>;
  }
};

export default Page;
