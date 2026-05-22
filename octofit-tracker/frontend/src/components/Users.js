import React, { useEffect, useState } from 'react';

const Users = () => {

  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : '/api/users/';

  useEffect(() => {
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Users data:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Users</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{item.username || item.name || '-'}</td>
                  <td><pre className="mb-0">{JSON.stringify(item, null, 2)}</pre></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
