import { Button } from "../button";

export function Signup () {
  return <div>
    <input type="text" placeholder="username" />
    <input type="password" placeholder="password" />
    <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >Sign up</button>
    <Button />
    </div>;
}