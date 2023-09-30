import AppProvider from './providers/app.provider';
import AppRoutes from './app-routes';

export function App() {
  // moment.updateLocale('en', {
  //   relativeTime: {
  //     s: 'now',
  //     m: '1 min',
  //     mm: '%d min',
  //   },
  // });
  // moment.updateLocale('ru', {
  //   relativeTime: {
  //     s: 'сейчас',
  //     m: '1 мин',
  //     mm: '%d мин',
  //   },
  // });
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
