import { formatDate } from "@/utils/formateDate";
import { getData } from "@/utils/getData";
import Link from "next/link";
import { CalendarIcon, ServerStackIcon } from "@heroicons/react/24/outline";
const page = async () => {
  const { data } = await getData();

  // const ec2Data = [];
  // const s3Data = [];
  // const firewallData = [];

  // data.forEach((group) => {
  //   group.services.forEach((service) => {
  //     const { type } = service;
  //     const serviceObject = { ...service, serviceType: type };
  //     if (
  //       type === "MINI" ||
  //       type === "LARGE" ||
  //       type === "SMALL" ||
  //       type === "XLARGE" ||
  //       type === "MEGA"
  //     ) {
  //       ec2Data.push(serviceObject);
  //     } else if (
  //       type === "ARCHIVE" ||
  //       type === "COLD" ||
  //       type === "HOT" ||
  //       type === "CDN"
  //     ) {
  //       s3Data.push(serviceObject);
  //     } else if (type === "IPV4" || type === "IPV6" || type === "IPV64") {
  //       firewallData.push(serviceObject);
  //     }
  //   });
  // });
  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Group</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <Link
            key={item.slug}
            href={`group/${item.slug}`}
            className="p-4 bg-white rounded-md shadow-md hover:shadow-lg"
          >
            <h3 title="Name of Group" className="text-lg font-semibold mb-2">
              {item.name}
            </h3>
            <p title="Group Creation Date" className="text-sm mb-2 flex gap-2">
              <CalendarIcon className="h-5 w-5"></CalendarIcon>{" "}
              {formatDate(item.createdAt)}
            </p>
            <p title="Total number of services" className="text-sm flex gap-2">
              <ServerStackIcon className="h-5 w-5"></ServerStackIcon>{" "}
              {item.services.length}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
