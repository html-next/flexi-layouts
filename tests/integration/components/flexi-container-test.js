import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import config from 'dummy/config/environment';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';
import { htmlSafe } from '@ember/string';

const bp = {};
const widths = {};

config.flexi.breakpoints.forEach(function(point) {
  bp[point.name] = point.begin + 5;
  widths[point.name] = htmlSafe(`width: ${bp[point.name]}px;`);
});

module('Integration | Component | flexi container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders in component form', async function(assert) {
    this.set('widths', widths);

    await render(hbs`
    <div style={{widths.huge}}>
      {{#flexi-container}}
        template block text
      {{/flexi-container}}
    </div>
    `);

    assert.equal(find('container').tagName, 'CONTAINER', 'We rendered a container');
    assert.equal(find('container').textContent.trim(), 'template block text');
  });

  test('huge responsive containers are responsive', async function(assert) {
    this.set('widths', widths);

    // huge
    await render(hbs`
    <div style={{widths.huge}}>
      {{#flexi-container}}
        template block text
      {{/flexi-container}}
    </div>
    `);

    assert.ok(find('container').classList.contains('container-lg'), 'We rendered the right classes for huge');

    // desktop
    await render(hbs`
    <div style={{widths.desktop}}>
      {{#flexi-container}}
        template block text
      {{/flexi-container}}
    </div>
    `);

    assert.ok(find('container').classList.contains('container-md'), 'We rendered the right classes for desktop');

    // tablet
    await render(hbs`
    <div style={{widths.tablet}}>
      {{#flexi-container}}
        template block text
      {{/flexi-container}}
    </div>
    `);

    assert.ok(find('container').classList.contains('container-sm'), 'We rendered the right classes for tablet');

    // mobile
    await render(hbs`
    <div style={{widths.mobile}}>
      {{#flexi-container}}
        template block text
      {{/flexi-container}}
    </div>
    `);

    assert.ok(find('container').classList.contains('container-xs'), 'We rendered the right classes for mobile');
  });

  test('it does not throw an error when a container is destroyed during a rerender', async function(assert) {
    // Renders a component that destroys a container during a forced re-render.
    await render(hbs`
      {{tests/components/destroyed-container}}
    `);

    assert.expect(0);
  });

  if (hasEmberVersion(2, 0)) {
    test('it renders a responsive container in angle bracket form', function(assert) {
      this.set('widths', widths);

      // Template block usage:"
      this.render(hbs`
      <div style={{widths.mobile}}>
        <container>
          template block text
        </container>
      </div>
      `);

      assert.equal(find('container').tagName, 'CONTAINER', 'We rendered a container');
      assert.ok(find('container').classList.contains('container-xs'), 'The container is responsive');
      assert.equal(find('container').textContent.trim(), 'template block text');
    });
  }
});
