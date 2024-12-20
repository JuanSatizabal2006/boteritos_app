import React, { useState } from 'react';
import { LayoutGeneral } from '../../layouts/LayoutGeneral';
import ProfileSection from '../../sections/profile/ProfileSection';

const EnhancedProfile = () => {
  

  return (
    <LayoutGeneral titleHeader={"Perfil"}>
      <ProfileSection/>
    </LayoutGeneral>
  );
};

export default EnhancedProfile;
