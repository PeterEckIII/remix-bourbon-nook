export default function Dropdown() {
  return (
    <select className="h-8 outline-gray-800 border-gray-200 border-2 rounded">
      <option value="SEALED">Sealed</option>
      <option value="OPENED">Opened</option>
      <option value="FINISHED">Finished</option>
    </select>
  );
}
