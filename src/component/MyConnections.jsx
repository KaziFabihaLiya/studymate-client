import React, { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "../Auth/AuthContext";
import MyPartnerCard from "./MyPartnerCard";
import api from "../utils/api"; 
import toast from "react-hot-toast";

const MyConnections = () => {
  const { user } = useContext(AuthContext); 
  const [partners, setPartners] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await api.get(`/my-profiles?email=${user.email}`);
        setPartners(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        toast.error("Error fetching profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  if (loading) {
    return (
      <div className="">
        Please wait... <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="mt-30 mx-auto px-30">
      {" "}
      {/* Fixed: Removed extra space in className */}
      <h1 className="text-5xl text-center font-bold p-10 mb-8">
        My Connections
      </h1>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mx-auto">
        {partners.map((partner) => (
          <MyPartnerCard key={partner._id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default MyConnections;
