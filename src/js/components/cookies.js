const cookiesBanner = document?.querySelector('.cookies');
const consentButton = document?.querySelector('.cookies__button');

if (cookiesBanner) {
  if (!localStorage.getItem('cookiesConsent')) {
    showCookiesBanner();
    consentButton.addEventListener('click', cookiesConsent)
  } else {
    hideCookiesBanner();
  }
}

function showCookiesBanner() {
  setTimeout(() => {
    cookiesBanner.hidden = false;
  }, 5000);
}

function hideCookiesBanner() {
  cookiesBanner.hidden = true;
}

function cookiesConsent() {
  localStorage.setItem('cookiesConsent', true);
  hideCookiesBanner();
}
