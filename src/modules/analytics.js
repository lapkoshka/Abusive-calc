export function sendAnalytics(data) {
  console.log(data);
  if (window.ga) {
    window.ga('send', 'event', 'button', 'click', data.button);
  } else {
    throw new Error('Google Analytics ga error');
  }
}