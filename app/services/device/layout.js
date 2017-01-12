import config from '../../config/environment';
import Service from 'flexi-layouts/services/device/layout';

export default Service.extend({
  breakpoints: config.flexi.breakpoints
});
