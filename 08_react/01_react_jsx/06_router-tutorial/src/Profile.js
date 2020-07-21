import React from 'react';
import WithRouterSample from './WithRouterSample';

const data = {
  wally: {
    name: 'Sim',
    description: 'Frontend'
  },
  wow: {
    name: 'Kim',
    description: 'Backend'
  }
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default Profile;