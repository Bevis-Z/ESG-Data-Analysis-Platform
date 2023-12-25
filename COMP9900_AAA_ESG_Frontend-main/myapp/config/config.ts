// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV = 'dev' } = process.env;
export default defineConfig({
  /**
   * @name Hash History
   * @description
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,
  /**
   * @name
   * @description
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name
   * @description  path，component，routes，redirect，wrappers，title
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name Theme configuration
   * @description
   * @doc antd https://ant.design/docs/react/customize-theme-cn
   * @doc umi https://umijs.org/docs/api/config#theme
   */
  theme: {
    'root-entry-name': 'variable',
    'primary-color': '#5d269f',
  },

  ignoreMomentLocale: true,
  /**
   * @name
   * @description
   * @doc https://umijs.org/docs/api/config#cssmodules
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name
   * @description
   * @doc https://umijs.org/docs/api/config#cssmodules
   */
  fastRefresh: true,
  /**
   * @name
   * @description
   * @doc https://umijs.org/docs/max/define-config#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE
   */
  model: {},

  initialState: {},

  title: 'Ant Design Pro',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs
   * @description
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },

  antd: {},
  /**
   * @name NetworkInformation API
   * @description  axios ahooks  useRequest
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name
   * @description
   * @doc https://umijs.org/docs/max/access
   */
  access: {},

  headScripts: [
    {
      src: '/scripts/loading.js',
      async: true,
    },
  ],
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI
   * @description based on swagger
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'http://localhost:8081/v2/api-docs',
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});
