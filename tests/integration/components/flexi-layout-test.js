import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | flexi layout', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    // Template block usage:"
    await render(hbs`
      {{#flexi-layout}}
        template block text
      {{/flexi-layout}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });
});
