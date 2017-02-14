import Controller from 'ember-controller';
import service from 'ember-service/inject';

export default Controller.extend({
  layoutService: service('device/layout'),
  heightChanged: false,
  resized: false,
  widthChanged: false,

  init() {
    this._super();

    this.get('layoutService').on('width-changed', () => {
      this.toggleProperty('widthChanged');
    });

    this.get('layoutService').on('height-changed', () => {
      this.toggleProperty('heightChanged');
    });

    this.get('layoutService').on('resized', () => {
      this.toggleProperty('resized');
    });
  }
});
