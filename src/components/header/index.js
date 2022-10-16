import '~/components/logo';
import '~/components/text';

import Header from './header';
import './header.scss';

const headers = document.querySelectorAll('.js-header');
headers.forEach((header) => new Header(header));
