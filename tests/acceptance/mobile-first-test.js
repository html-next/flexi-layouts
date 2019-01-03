import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { run } from '@ember/runloop';

let deviceLayout;

module('Acceptance | mobile-first', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    deviceLayout = this.owner.lookup('service:device/layout');
  });

  test('Breakpoints fall back to the closest defined breakpoint', async function(assert) {
    let breakpoints = deviceLayout.get('breakpoints');
    let bp = {};

    breakpoints.forEach(function(point) {
      bp[point.name] = point.begin + 5;
    });

    deviceLayout.set('width', bp.mobile);

    await visit('/tests/mobile-first');

    assert.equal(currentURL(), '/tests/mobile-first');

    assert.dom('h1.layout-test').hasText(
      'Mobile!',
      `The layout renders the mobile layout when width is ${bp.mobile}`
    );
    run(() => {
      deviceLayout.set('width', bp.tablet);
    });

    assert.dom('h1.layout-test').hasText(
      'Mobile!',
      `The layout still renders the mobile layout when width is ${bp.tablet} (no tablet layout defined)`
    );
    run(() => {
      deviceLayout.set('width', bp.desktop);
    });

    assert.dom('h1.layout-test').hasText(
      'Desktop!',
      `The layout renders the desktop layout when width is ${bp.desktop}`
    );
    run(() => {
      deviceLayout.set('width', bp.huge);
    });

    assert.dom('h1.layout-test').hasText(
      'Desktop!',
      `The layout renders the desktop layout when width is ${bp.huge}`
    );
  });
});
