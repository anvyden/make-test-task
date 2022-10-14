import Select from './select';
import './select.scss';

const selects = document.querySelectorAll('.js-select');
selects.forEach((select) => new Select(select));
