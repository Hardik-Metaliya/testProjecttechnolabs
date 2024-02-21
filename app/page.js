import { getData } from "@/utils/getData";
import Link from "next/link";

const page = async () => {
  const { data } = await getData();

  const ec2Data = [];
  const s3Data = [];
  const firewallData = [];

  data.forEach((group) => {
    group.services.forEach((service) => {
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
  });

  return (
    <div className="bg-gray-100 p-4 h-screen">
      <h2 className="text-2xl font-bold mb-4">Group</h2>

      {data.map((item) => (
        <Link
          key={item.slug}
          href={`group/${item.slug}`}
          className="block p-2 mb-2 bg-white rounded-md shadow-md hover:shadow-lg"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default page;
