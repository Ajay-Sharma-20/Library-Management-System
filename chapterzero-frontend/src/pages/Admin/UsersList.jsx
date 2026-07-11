import { useEffect, useState } from 'react';
import API from '../../api/axios';
import { Mail, Calendar, ShieldCheck, User } from 'lucide-react';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/auth/users');
        setUsers(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Library Directory</h1>
        <p className="text-gray-500">Monitor active accounts, status, and system clearance levels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((member) => (
          <div 
            key={member._id} 
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                  member.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {member.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{member.name}</h4>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                    member.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {member.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-50 pt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-400" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <span>Joined {new Date(member.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;