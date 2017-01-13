import Component from 'ember-component';
import service from 'ember-service/inject';
import layout from '../templates/components/flexi-layout';

export default Component.extend({
  layout,
  tagName: '',
  deviceLayout: service('device/layout')
});
