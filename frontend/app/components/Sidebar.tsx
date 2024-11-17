import StreamerList from "./StreamerList";
const Sidebar = () => {
  return (
    <aside className="w-80 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-4 text-center border-b border-gray-700 pb-2">
        스트리머 목록
      </h1>
      <StreamerList />
    </aside>
  );
};

export default Sidebar;