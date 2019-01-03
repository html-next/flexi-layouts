import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import config from 'dummy/config/environment';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';
import { htmlSafe } from '@ember/string';
import EmberObject from '@ember/object';

const bp = {};
const widths = EmberObject.create({});

config.flexi.breakpoints.forEach(function(point) {
  bp[point.name] = point.begin + 5;
  widths.set(point.name, htmlSafe(`width: ${bp[point.name]}px;`));
});

module('Integration | Component | flexi grid', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders in component form', async function(assert) {

    this.set('widths', widths);
    await render(hbs`
    <div style={{widths.huge}}>
      {{#flexi-grid}}
        template block text
      {{/flexi-grid}}
    </div>
    `);

    assert.equal(find('grid').tagName, 'GRID', 'We rendered a grid');
    assert.dom('grid').hasText('template block text');
  });

  test('responsive grids are responsive', async function(assert) {
    this.set('widths', widths);

    // huge
    await render(hbs`
    <div style={{widths.huge}}>
      {{#flexi-grid}}
        template block text
      {{/flexi-grid}}
    </div>
    `);

    assert.dom('grid').hasClass('container-lg', 'We rendered the right classes for huge');

    // desktop
    await render(hbs`
    <div style={{widths.desktop}}>
      {{#flexi-grid}}
        template block text
      {{/flexi-grid}}
    </div>
    `);

    assert.dom('grid').hasClass('container-md', 'We rendered the right classes for desktop');

    // tablet
    await render(hbs`
    <div style={{widths.tablet}}>
      {{#flexi-grid}}
        template block text
      {{/flexi-grid}}
    </div>
    `);

    assert.dom('grid').hasClass('container-sm', 'We rendered the right classes for tablet');

    // mobile
    await render(hbs`
    <div style={{widths.mobile}}>
      {{#flexi-grid}}
        template block text
      {{/flexi-grid}}
    </div>
    `);

    assert.dom('grid').hasClass('container-xs', 'We rendered the right classes for mobile');
  });

  test('it renders in angle bracket form', async function(assert) {
    this.set('widths', widths);

    await render(hbs`
    <div style={{widths.mobile}}>
      <grid>
        template block text
      </grid>
    </div>
    `);

    assert.equal(find('grid').tagName, 'GRID', 'We rendered a grid');
    assert.dom('grid').doesNotHaveClass('container-xs', 'The grid is not responsive');
    assert.dom('grid').hasText('template block text');
  });

  if (hasEmberVersion(2, 0)) {
    test('it renders a responsive grid in angle bracket form', function(assert) {
      this.set('widths', widths);

      this.render(hbs`
      <div style={{widths.mobile}}>
        <grid responsive>
          template block text
        </grid>
      </div>
      `);

      assert.equal(find('grid').tagName, 'GRID', 'We rendered a grid');
      assert.dom('grid').hasClass('container-xs', 'The grid is responsive');
      assert.dom('grid').hasText('template block text');
    });
  }
});
