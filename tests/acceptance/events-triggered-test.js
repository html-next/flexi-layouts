import $ from 'jquery';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | events triggered');

test('visiting /tests/events-triggered', function(assert) {
  visit('/tests/events-triggered');

  andThen(function() {
    assert.equal(currentURL(), '/tests/events-triggered');
    window.resizeTo(200, 200);
    assert.equal($('#heightChanged').text(), 'true', 'height changed fired');
    assert.equal($('#resized').text(), 'true', 'resized fired');
    assert.equal($('#widthChanged').text(), 'true', 'width changed fired');
  });
});
