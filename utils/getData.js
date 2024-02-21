export const getData = async () => {
  try {
    const response = await fetch(
      "https://servers.sanboxes.soulharsh007.dev/api/projects",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getDataBySlug = async (slug) => {
  try {
    if (!slug) return null;

    const data = await getData();
    const filteredData = data.data.filter((item) => item.slug === slug);
    return filteredData.length > 0 ? filteredData[0] : null;
  } catch (error) {
    console.error("Error fetching data by slug:", error);
    throw error;
  }
};
