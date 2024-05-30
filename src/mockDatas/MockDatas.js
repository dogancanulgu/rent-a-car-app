import i18n from '@/i18n';

export const SideBarItems = () => {
  const userItems = [
    { key: '', label: i18n.t('Home') },
    {
      key: 'bookings',
      label: i18n.t('Bookings'),
    },
    {
      key: 'profile',
      label: i18n.t('Profile'),
    },
  ];
  const ownerItems = [
    { key: '', label: i18n.t('Home') },
    {
      key: 'bookings',
      label: i18n.t('Bookings'),
    },
    {
      key: 'cars',
      label: i18n.t('Cars'),
    },
    {
      key: 'profile',
      label: i18n.t('Profile'),
    },
  ];
  const adminItems = [
    { key: '', label: i18n.t('Home') },
    {
      key: 'bookings',
      label: i18n.t('Bookings'),
    },
    {
      key: 'users',
      label: i18n.t('Users'),
    },
    {
      key: 'cars',
      label: i18n.t('Cars'),
    },
  ];

  return { userItems, ownerItems, adminItems };
};
