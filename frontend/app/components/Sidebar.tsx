const Sidebar = () => {
  return (
    <div className="w-1/6 bg-gray-800 p-4 flex flex-col space-y-4">
      <h2 className="text-lg font-bold">스트리머 목록</h2>
      <ul className="space-y-2">
        {['스트리머1', '스트리머2', '스트리머3', '스트리머4'].map((streamer, index) => (
          <li key={index} className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
            {streamer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;