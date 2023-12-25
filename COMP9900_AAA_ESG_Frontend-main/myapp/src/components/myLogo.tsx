// src/components/MyLogo.jsx
import React from 'react';
import logoImage from '../../public/logo.svg'; // 确保路径正确

const MyLogo = () => {
  return <img src={logoImage} alt="Logo" style={{ width: 'auto', height: '32px' }} />;
};

export default MyLogo;
