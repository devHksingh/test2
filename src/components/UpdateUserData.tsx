import { useNavigate, useParams } from "react-router-dom";
import { databases } from "../appwrite/config";
import { useEffect, useState } from "react";

const UpdateUserData = () => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { userId } = useParams();

  const init = async (id: string) => {
    try {
      const res = await databases.getDocument(
        import.meta.env.VITE_PUBLIC_DATABASE_ID,
        import.meta.env.VITE_PUBLIC_COLLECTION_ID_USER,
        id
      );
      setUserName(res.name || "");
      setUserAge(res.age || null);
      setUserEmail(res.email || "");
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      init(userId);
    }
  }, [userId]);

  const handleUpdate = async () => {
    if (!userId) return;

    try {
      const res = await databases.updateDocument(
        import.meta.env.VITE_PUBLIC_DATABASE_ID,
        import.meta.env.VITE_PUBLIC_COLLECTION_ID_USER,
        userId, 
        {
          name: userName || "",
          age: userAge || null,
          email: userEmail || "",
        }
      );
      console.log("Updated successfully:", res);
      navigate("/show"); // Redirect after update
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="h-screen max-w-4xl p-4 mx-auto space-y-4 text-center">
      <h2 className="text-2xl font-medium text-center">User Details</h2>

      {isLoading ? (
        <div className="w-full h-60 animate-pulse bg-stone-600"></div>
      ) : (
        <div className="flex flex-col items-center justify-center max-w-md gap-4 p-4 mx-auto border rounded-md">
          <label className="flex flex-col justify-start w-full">
            <span className="block text-left opacity-80">UserName:</span>
            <input
              type="text"
              value={userName}
              className="p-1 text-black rounded-md cursor-pointer bg-stone-400 placeholder:text-black"
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>

          <label className="flex flex-col justify-start w-full">
            <span className="block text-left opacity-80">UserAge:</span>
            <input
              type="number"
              value={userAge ?? ""}
              onChange={(e) => setUserAge(e.target.value ? Number(e.target.value) : null)}
              className="p-1 text-black rounded-md cursor-pointer bg-stone-400"
            />
          </label>

          <label className="flex flex-col justify-start w-full">
            <span className="block text-left opacity-80">UserEmail:</span>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="p-1 text-black rounded-md cursor-pointer bg-stone-400"
            />
          </label>

          <div className="flex gap-4">
            <button
              className="p-1 px-2 bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={() => navigate("/show")} 
            >
              Cancel
            </button>
            <button
              className="p-1 px-2 rounded-md bg-rose-500 hover:bg-rose-600"
              onClick={handleUpdate} 
            >
              Update
            </button>
          </div>
        </div>
      )}

      <p className="capitalize">
        <span className="font-medium text-orange-400 underline underline-offset-4">
          CAUTION
        </span>{" "}
        : Once updated you cannot get back old value.
      </p>
    </div>
  );
};

export default UpdateUserData;
