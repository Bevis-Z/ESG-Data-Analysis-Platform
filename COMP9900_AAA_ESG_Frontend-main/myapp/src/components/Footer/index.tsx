import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = 'Produced by Bowen Zhao';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Personal Website',
          href: 'https://bowen.world/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Bevis-Z',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Bowen Zhao',
          href: 'https://github.com/Bevis-Z',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
