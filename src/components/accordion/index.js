import Accordion from './accordion';
import './accordion.scss';

const accordions = document.querySelectorAll('.js-accordion');
accordions.forEach((accordion) => new Accordion(accordion));
