import { 
  DashboardOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'dashboard',
  path: `${APP_PREFIX_PATH}/dashboard`,
  title: 'Dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'cars',
  path: `${APP_PREFIX_PATH}/cars`,
  title: 'Cars',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'users',
  path: `${APP_PREFIX_PATH}/users`,
  title: 'Users',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'trips',
  path: `${APP_PREFIX_PATH}/trips`,
  title: 'Trips',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'earings',
  path: `${APP_PREFIX_PATH}/earnings`,
  title: 'Earnings',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'role',
  path: `${APP_PREFIX_PATH}/role`,
  title: 'Role',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'admin',
  path: `${APP_PREFIX_PATH}/admin`,
  title: 'Admin',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},{
  key: 'logout',
  path: `${APP_PREFIX_PATH}/logout`,
  title: 'Log Out',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
