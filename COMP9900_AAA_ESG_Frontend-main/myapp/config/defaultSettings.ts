import { ProLayoutProps } from '@ant-design/pro-components';
import logo from '../public/logo.svg';
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#722ED1',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: ' ',
  pwa: true,
  logo: '/logo.svg',
  iconfontUrl: '',
  token: {
  },
};

export default Settings;
