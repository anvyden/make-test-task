import '~/components/text';

import TextField from './text-field';
import './text-field.scss';

const textFields = document.querySelectorAll('.js-text-field');
textFields.forEach((textField) => new TextField(textField));
