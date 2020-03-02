import { ALL_PERMISSIONS } from 'constant';

export default {
  items: [
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'Dashboard',
          title: 'Thống kê',
          type: 'item',
          url: '/dashboard',
          classes: 'nav-item',
          icon: 'feather icon-home'
        },
        {
          id: 'User',
          title: 'Quản lý user, quyền',
          type: 'collapse',
          icon: 'feather icon-user',
          authorization: ALL_PERMISSIONS.MANAGE_USER,
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Quyền',
              type: 'item',
              url: '/user-role',
              icon: 'feather icon-unlock'
            },
            {
              id: 'menu-level-1.2',
              title: 'User',
              type: 'item',
              url: '/user',
              icon: 'feather icon-list'
            }
          ]
        },
        {
          id: 'school',
          title: 'Quản lý trường học',
          type: 'collapse',
          icon: 'feather icon-user',
          authorization: ALL_PERMISSIONS.MANAGE_SCHOOL,
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Danh sách trường học',
              type: 'item',
              url: '/school',
              icon: 'feather icon-sidebar'
            },
            {
              id: 'menu-level-1.2',
              title: 'Đánh giá trường học',
              type: 'item',
              url: '/school-review',
              icon: 'feather icon-list'
            }
          ]
        },
        {
          id: 'badge',
          title: 'Quản lý danh hiệu',
          type: 'item',
          url: '/badge',
          classes: 'nav-item',
          authorization: ALL_PERMISSIONS.MANAGE_ALL,
          icon: 'feather icon-flag'
        },
        {
          id: 'Location',
          title: 'Quản lý địa điểm',
          type: 'collapse',
          authorization: ALL_PERMISSIONS.MANAGE_ALL,
          icon: 'feather icon-home',
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Các loại địa điểm',
              type: 'item',
              url: '/location-type',
              icon: 'feather icon-home'
            },
            {
              id: 'menu-level-1.2',
              title: 'Các địa điểm',
              type: 'item',
              url: '/location',
              icon: 'feather icon-list'
            },
            {
              id: 'menu-level-1.3',
              title: 'Đánh giá địa điểm',
              type: 'item',
              url: 'location-review',
              icon: 'feather icon-list'
            }
          ]
        },
        {
          id: 'campaign',
          title: 'Cuộc thi',
          type: 'collapse',
          icon: 'feather icon-award',
          authorization: ALL_PERMISSIONS.MANAGE_CAMPAIGN,
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Các đội thi',
              type: 'item',
              url: '/campaign',
              icon: 'feather icon-home'
            },
            {
              id: 'menu-level-1.2',
              title: 'Các thể loại thi',
              type: 'item',
              url: '/campaign-type',
              icon: 'feather icon-list'
            },
            {
              id: 'menu-level-1.3',
              title: 'Các trận đấu',
              type: 'item',
              url: '/campaign-battle',
              icon: 'feather icon-flag'
            },
            {
              id: 'menu-level-1.4',
              title: 'Các vòng đấu',
              type: 'item',
              url: '/campaign-round',
              icon: 'feather icon-layers'
            }
          ]
        },
        {
          id: 'notiftication-management',
          title: 'Gửi thông báo',
          type: 'item',
          url: '/send-notification',
          classes: 'nav-item',
          authorization: ALL_PERMISSIONS.MANAGE_ALL,
          icon: 'feather icon-bell'
        },
        {
          id: 'report',
          title: 'Quản lý báo cáo vi phạm',
          type: 'item',
          url: '/report',
          classes: 'nav-item',
          authorization: ALL_PERMISSIONS.MANAGE_ALL,
          icon: 'feather icon-x-circle'
        },
        {
          id: 'affiliate',
          title: 'Quản lý liên kết',
          type: 'item',
          url: '/affiliate',
          classes: 'nav-item',
          authorization: ALL_PERMISSIONS.MANAGE_ALL,
          icon: 'feather icon-link'
        },
        {
          id: 'ads',
          title: 'Quản lý quảng cáo',
          type: 'collapse',
          authorization: ALL_PERMISSIONS.MANAGE_ALL,
          icon: 'feather icon-image',
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Các loại quảng cáo',
              type: 'item',
              url: '/ads-type',
              icon: 'feather icon-image'
            },
            {
              id: 'menu-level-1.2',
              title: 'Danh sách quảng cáo',
              type: 'item',
              url: '/ads',
              icon: 'feather icon-list'
            }
          ]
        }
      ]
    }
  ]
};
