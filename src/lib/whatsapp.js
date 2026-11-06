// Single source for the WhatsApp contact. api.whatsapp.com/send keeps the
// prefilled text reliable on phones and WhatsApp Web.
export const WHATSAPP_NUMBER = '50688226740';

export const whatsappUrl = (message = '') =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}${message ? `&text=${encodeURIComponent(message)}` : ''}`;

// Props for any <a> that opens WhatsApp in a new tab
export const whatsappLinkProps = (message) => ({
  href: whatsappUrl(message),
  target: '_blank',
  rel: 'noopener noreferrer',
});
