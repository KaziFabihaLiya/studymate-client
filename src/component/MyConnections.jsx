import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import MyPartnerCard from './MyPartnerCard';

const MyConnections = () => {
    const { user } = use(AuthContext);
    const [partner, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(`http://localhost:5000/my-profiles?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setPartners(data);
          setLoading(false);
        });
    }, [user]);

    if (loading) {
      return <div> Please wait ... Loading...</div>;
    }
        return (
          <div  className='mt-30 mx-auto px-30'>
            <h1 className='text-5xl text-center font-bold p-10 mb-8'>My Connections</h1>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mx-auto">
              {partner.map((partner) => (
                <MyPartnerCard key={partner._id} partner={partner} />
              ))}
            </div>
          </div>
        );
};

export default MyConnections;