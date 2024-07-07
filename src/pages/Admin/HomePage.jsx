function HomePage() {
  return (
    <>
      <table className="table-fixed w-full border-gray-600">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Posted By
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Caption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Posted On
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">30</td>
            <td className="px-6 py-4 whitespace-nowrap">30</td>
            <td className="px-6 py-4 whitespace-nowrap">30</td>
            <td className="px-6 py-4 whitespace-nowrap">30</td>
            <td className="px-6 py-4 whitespace-nowrap">30</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default HomePage;
