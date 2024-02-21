import { getDataBySlug } from "@/utils/getData";
import Link from "next/link";

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
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">EC2 Services</h2>
        {ec2Data.map((service) => (
          <Link
            key={service.slug}
            href={`${props.params.group}/${service.slug}`}
            className="block p-4 mb-4 bg-white rounded-md shadow-md hover:shadow-lg"
          >
            {service.name}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">S3 Services</h2>
        {s3Data.map((service) => (
          <Link
            key={service.slug}
            href={`${props.params.group}/${service.slug}`}
            className="block p-4 mb-4 bg-white rounded-md shadow-md hover:shadow-lg"
          >
            {service.name}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Firewall Services</h2>
        {firewallData.map((service) => (
          <Link
            key={service.slug}
            href={`${props.params.group}/${service.slug}`}
            className="block p-4 mb-4 bg-white rounded-md shadow-md hover:shadow-lg"
          >
            {service.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
