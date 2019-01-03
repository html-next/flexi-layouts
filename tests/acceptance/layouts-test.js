import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { run } from '@ember/runloop';

let deviceLayout;

module('Acceptance | layouts', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    deviceLayout = this.owner.lookup('service:device/layout');
  });

  test('visiting /tests/layouts', async function(assert) {
    await visit('/tests/layouts');
    let breakpoints = deviceLayout.get('breakpoints');
    let bp = {};

    breakpoints.forEach(function(point) {
      bp[point.name] = point.begin + 5;
    });

    deviceLayout.set('width', bp.huge);

    assert.equal(currentURL(), '/tests/layouts');

    assert.dom('h1.layout-test').hasText('Huge!', `The layout renders the huge layout when width is ${bp.huge}`);
    run(() => {
      deviceLayout.set('width', bp.desktop);
    });

    assert.dom('h1.layout-test').hasText(
      'Desktop!',
      `The layout renders the desktop layout when width is ${bp.desktop}`
    );
    run(() => {
      deviceLayout.set('width', bp.tablet);
    });

    assert.dom('h1.layout-test').hasText(
      'Tablet!',
      `The layout renders the tablet layout when width is ${bp.tablet}`
    );
    run(() => {
      deviceLayout.set('width', bp.mobile);
    });

    assert.dom('h1.layout-test').hasText(
      'Mobile!',
      `The layout renders the mobile layout when width is ${bp.mobile}`
    );
  });
});

