import { getDataBySlug } from "@/utils/getData";
import Link from "next/link";
import {
  CalendarIcon,
  GlobeAsiaAustraliaIcon,
  ArchiveBoxIcon,
  CircleStackIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/formateDate";

const Page = async (props) => {
  const data = await getDataBySlug(props.params.group);

  const ec2Data = [];
  const s3Data = [];
  const firewallData = [];

  data.services.forEach((service) => {
    const { type } = service;
    const serviceObject = { ...service, serviceType: type };

    if (
      type === "MINI" ||
      type === "LARGE" ||
      type === "SMALL" ||
      type === "XLARGE" ||
      type === "MEGA"
    ) {
      ec2Data.push(serviceObject);
    } else if (
      type === "ARCHIVE" ||
      type === "COLD" ||
      type === "HOT" ||
      type === "CDN"
    ) {
      s3Data.push(serviceObject);
    } else if (type === "IPV4" || type === "IPV6" || type === "IPV64") {
      firewallData.push(serviceObject);
    }
  });
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">EC2 Services</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ec2Data.map((service) => (
          <Link
            key={service.slug}
            href={`${props.params.group}/${service.slug}`}
            className="flex flex-col p-4 bg-white rounded-md shadow-md hover:shadow-lg"
          >
            <h3 title="Name of EC2" className="text-lg font-semibold mb-2">
              {service.name}
            </h3>
            <p
              title="Size of EC2"
              className="mb-2 flex gap-2 text-base text-gray-500 items-center"
            >
              {" "}
              <CpuChipIcon className="h-5 w-5"></CpuChipIcon> {service.type}
            </p>
            <div
              title="Creation Date"
              className="mb-2 flex gap-2 text-sm text-gray-500 items-center"
            >
              <CalendarIcon className="h-5 w-5"></CalendarIcon>{" "}
              {formatDate(service.createdAt)}
            </div>{" "}
          </Link>
        ))}
      </div>

      <h2 className="text-2xl mt-10 mb-2 pb-0 font-bold ">S3 Services</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {s3Data.map((service) => (
          <Link
            key={service.slug}
            href={`${props.params.group}/${service.slug}`}
            className="flex flex-col p-4 bg-white rounded-md shadow-md hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
            <p
              className="mb-2 flex gap-2 text-base text-gray-500 items-center"
              title="Type"
            >
              <ArchiveBoxIcon className="h-5 w-5"></ArchiveBoxIcon>{" "}
              {service.type}
            </p>

            <div
              className="flex gap-2 text-sm text-gray-500"
              title="Created At"
            >
              <CalendarIcon className="h-5 w-5"></CalendarIcon>{" "}
              {formatDate(service.createdAt)}
            </div>
            <p
              className="text-sm text-gray-500 mt-2 flex gap-2 items-center"
              title="Region"
            >
              <GlobeAsiaAustraliaIcon className="h-5 w-5"></GlobeAsiaAustraliaIcon>{" "}
              {service.specs.region}
            </p>
            <p
              className="text-sm text-gray-500 flex gap-2 mt-2 items-center"
              title="Max Objects"
            >
              <ExclamationTriangleIcon className="h-5 w-5"></ExclamationTriangleIcon>{" "}
              {service.specs.maxObjects}
            </p>
            <p
              className="text-sm text-gray-500 mt-2 flex gap-2 items-center"
              title="Max Size"
            >
              <CircleStackIcon className="h-5 w-5"></CircleStackIcon>
              Max Size: {service.specs.maxSize} MB
            </p>
          </Link>
        ))}
      </div>
      <h2 className="text-2xl mt-10 mb-2 pb-0 font-bold">Firewall Services</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {firewallData.map((service) => (
          <Link
            key={service.slug}
            href={`${props.params.group}/${service.slug}`}
            className="flex flex-col p-4 bg-white rounded-md shadow-md hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>

            <p
              className="mb-2 flex gap-2 text-base text-gray-500 items-center"
              title="Type"
            >
              <ShieldCheckIcon className="h-5 w-5"></ShieldCheckIcon>{" "}
              {service.type}
            </p>

            <div
              className="flex gap-2 text-sm text-gray-500"
              title="Created At"
            >
              <CalendarIcon className="h-5 w-5"></CalendarIcon>{" "}
              {formatDate(service.createdAt)}
            </div>

            <p
              className="text-sm text-gray-500 mt-2 flex gap-2 items-center"
              title="Max IPv4 Rules"
            >
              Max IPV4 Rules: {service.specs.maxIpv4Rules}
            </p>

            <p
              className="text-sm text-gray-500 flex gap-2 items-center"
              title="Max IPv6 Rules"
            >
              Max IPV6 Rules: {service.specs.maxIpv6Rules}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
