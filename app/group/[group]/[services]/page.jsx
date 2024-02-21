import { getDataBySlug } from "@/utils/getData";

const EC2Details = ({ filteredData }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">{filteredData.name}</h1>
      <p className="text-gray-600 mb-2">Slug: {filteredData.slug}</p>
      <p className="text-gray-600 mb-2">Type: {filteredData.type}</p>
      <p className="text-gray-600 mb-4">
        Created At: {new Date(filteredData.createdAt).toLocaleString()}
      </p>

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
        <p className="text-gray-600">CPU: {filteredData.specs.cpu}</p>
        <p className="text-gray-600">Memory: {filteredData.specs.memory} MB</p>
        <p className="text-gray-600">Disk: {filteredData.specs.disk} MB</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Usage Over Time:</h2>
        <div style={{ height: "300px" }}>{JSON.stringify(filteredData)}</div>
      </div>
    </div>
  );
};

const S3Details = ({ filteredData }) => (
  <div>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">{filteredData.name}</h1>
      <p className="text-gray-600 mb-2">Slug: {filteredData.slug}</p>
      <p className="text-gray-600 mb-2">Type: {filteredData.type}</p>
      <p className="text-gray-600 mb-4">
        Created At: {new Date(filteredData.createdAt).toLocaleString()}
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Specifications:</h2>
        <p className="text-gray-600">Region: {filteredData.specs.region}</p>
        <p className="text-gray-600">
          Max Objects: {filteredData.specs.maxObjects}
        </p>
        <p className="text-gray-600">
          Max Size: {filteredData.specs.maxSize} MB
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Usage Over Time:</h2>
        <div style={{ height: "300px" }}>
          {JSON.stringify(filteredData.usage)}
        </div>
      </div>
    </div>
  </div>
);

const FirewallDetails = ({ filteredData }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">{filteredData.name}</h1>
      <p className="text-gray-600 mb-2">Slug: {filteredData.slug}</p>
      <p className="text-gray-600 mb-2">Type: {filteredData.type}</p>
      <p className="text-gray-600 mb-4">
        Created At: {new Date(filteredData.createdAt).toLocaleString()}
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Specifications:</h2>
        <p className="text-gray-600">
          Max IPv4 Rules: {filteredData.specs.maxIpv4Rules}
        </p>
        <p className="text-gray-600">
          Max IPv6 Rules: {filteredData.specs.maxIpv6Rules}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Rules:</h2>
        <ul>
          {filteredData.rules.map((rule, index) => (
            <li key={index} className="mb-1">
              <p>IP: {rule.ip}</p>
              <p>Type: {rule.type}</p>
              <p>Verdict: {rule.verdict}</p>
              <p>Port: {rule.port}</p>
              <p>Description: {rule.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Usage Over Time:</h2>
        <ul>
          {filteredData.usage.map((usage, index) => (
            <li key={index} className="mb-1">
              <p>Requests: {usage.requests}</p>
              <p>Allowed: {usage.allowed}</p>
              <p>Blocked: {usage.blocked}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Page = async (props) => {
  const data = await getDataBySlug(props.params.group);
  const filteredData = data.services.find(
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
